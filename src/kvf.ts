import fs from 'fs'
import path from 'path'

export class KVF {
    private path: string
    constructor() {
        this.path = '_temp_'
    }

    /**
     * 
     * @param key please don't use invalid filename
     * @param data can be anything
     * @param ttl in ms
     */
    set<T>(key: string, data: T, ttl?: number) {
        // create folder if doesn't exist
        if (!fs.existsSync(this.path)) fs.mkdirSync(this.path, { recursive: true })
        
        const p = path.join(this.path, key)
        fs.writeFileSync(p, JSON.stringify(data, null, '\t'), { encoding: 'utf8' })
        
        if (ttl !== undefined) setTimeout(() => {
            this.clear(key)
        }, ttl)
    }

    get(key: string): any | null {
        const p = path.join(this.path, key)
        if (!fs.existsSync(p)) return null

        const data = fs.readFileSync(p, { encoding: 'utf8' })
        return JSON.parse(data)
    }

    clear(key: string) {
        const p = path.join(this.path, key)
        if (fs.existsSync(p)) fs.unlinkSync(p)
    }

    clearAll() {
        fs.rmSync(this.path, { recursive: true })
    }

}