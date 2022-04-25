import fs from 'fs'
import path from 'path'

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
    async set<T>(key: string, data: T, ttl?: number) {
        // create folder if doesn't exist
        if (!fs.existsSync(this.path)) fs.mkdirSync(this.path, { recursive: true })

        const p = path.join(this.path, key)
        fs.writeFileSync(p, JSON.stringify(data, null, '\t'), { encoding: 'utf8' })

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
            if (typeof v === 'string') {
                const date: Date = new Date(v)
                if (!isNaN(date.getTime())) return date
            }
            return v
        })
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