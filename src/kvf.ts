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
     * @param ttl in ms
     */
    set<T>(key: string, data: T , ttl?: number) {
        if (typeof data === 'object' && data !== null) {
            data = transform(data as any)
        }

        this._set(key, data, ttl)

        if (ttl !== undefined) setTimeout(() => {
            this.clear(key)
        }, ttl)
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
            const t = v?.__type__
            if (t === 'Date') v = new Date(v.__value__)
            if (t === 'Uint8Array') v = new Uint8Array(v.__value__)
            return v
        })
    }

    /**
     * clear saved data
     * @param key 
     */
    clear(key: string) {
        const p = path.join(this.path, key)
        if (fs.existsSync(p)) fs.unlinkSync(p)
    }

    /**
     * clear all saved data
     */
    clearAll() {
        if (fs.existsSync(this.path)) fs.rmSync(this.path, { recursive: true })
    }

}