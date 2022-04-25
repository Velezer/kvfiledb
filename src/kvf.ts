import fs from 'fs'
import path from 'path'

function iterateTransform(obj: object): any {
    for (const key in obj) {
        if (key === '__single__') break
        const element = Object(obj)[key]
        if (element instanceof Date) {
            Object(obj)[key] = { __type__: 'date', __value__: element }
            continue
        }
        if (typeof element === 'object') {
            return transform(Object(obj)[key])
        }
    }
}

function transform(obj: object): any {
    if (obj instanceof Date) obj = Object({ __single__: { __type__: 'date', __value__: obj } })
    iterateTransform(obj)
    return obj
}

export class KVF {
    private path: string
    constructor(path: string = '_temp_') {
        this.path = path
    }

    /**
     * the data will be stored as a file
     * @param key is the filename. please don't use invalid filename
     * @param data can be anything
     * @param ttl in ms
     */
    async set<T>(key: string, data: T | object, ttl?: number) {
        data = transform(data as object)
        const p = path.join(this.path, key)
        try {
            fs.writeFileSync(p, JSON.stringify(data, null, '\t'), { encoding: 'utf8' })
        } catch (err: any) {
            if (err.code == 'ENOENT') {
                if (!fs.existsSync(this.path)) {// create folder if doesn't exist
                    fs.mkdirSync(this.path, { recursive: true })
                    fs.writeFileSync(p, JSON.stringify(data, null, '\t'), { encoding: 'utf8' })
                }
            }
        }

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
        const parsed = JSON.parse(data, (k, v) => {
            if (v?.__type__ === 'date') return new Date(v.__value__)
            return v
        })
        return parsed?.__single__ || parsed
    }

    /**
     * clear saved data
     * @param key 
     */
    async clear(key: string) {
        const p = path.join(this.path, key)
        if (fs.existsSync(p)) fs.unlinkSync(p)
    }

    /**
     * clear all saved data
     */
    async clearAll() {
        fs.rmSync(this.path, { recursive: true })
    }

}