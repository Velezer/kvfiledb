import fs from 'fs'
import path from 'path'
import { transform } from './transform'


export class KVF {
    private path: string
    constructor(path: string = '_temp_') {
        this.path = path
    }

    private _set(key: string, data: any, ttl?: number) {
        const p = path.join(this.path, key)
        try {
            fs.writeFileSync(p, JSON.stringify(data, null, '\t'), { encoding: 'utf8' })
        } catch (err: any) {
            if (err.code == 'ENOENT' && !fs.existsSync(this.path)) {
                // create folder if doesn't exist
                fs.mkdirSync(this.path, { recursive: true })
                this._set(key, data, ttl)
            }
        }
    }

    /**
     * the data will be stored as a file
     * @param key is the filename. please don't use invalid filename
     * @param data can be anything
     * @param ttl in ms - if undefined your data won't be cleared
     */
    set<T>(key: string, data: T, ttl?: number) {
        if (typeof data === 'object' && data !== null) {
            data = transform(data as any)
        }

        this._set(key, data, ttl)
        if (ttl) this.clear(key, ttl)
    }

    /**
     * get data
     * @param key 
     * @returns data
     */
    get(key: string): any | null {
        const p = path.join(this.path, key)
        if (!fs.existsSync(p)) return null

        const data = fs.readFileSync(p, { encoding: 'utf8' })
        return JSON.parse(data, (k, v) => {
            if (typeof v === 'string') {
                try {
                    if (v.startsWith('Date|')) v = new Date(v.replace('Date|', ''))
                    if (v.startsWith('Uint8Array|')) v = new Uint8Array(eval(v.replace('Uint8Array|', '')))
                    if (v.startsWith('Buffer|')) v = Buffer.from(eval(v.replace('Buffer|', '')))
                } catch (err) {
                }
            }
            return v
        })
    }

    private _clear(key: string) {
        const p = path.join(this.path, key)
        if (fs.existsSync(p)) fs.unlinkSync(p)
    }
    /**
     * clear saved data
     * @param key 
     * @param ttl if undefined will clear immediately
     */
    clear(key: string, ttl?: number) {
        if (ttl !== undefined) setTimeout(() => {
                this._clear(key)
            }, ttl)
        else this._clear(key)
    }

    /**
     * clear all saved data
     */
    clearAll() {
        if (fs.existsSync(this.path)) fs.rmSync(this.path, { recursive: true })
    }

}