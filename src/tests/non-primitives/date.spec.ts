import { KVF } from "../../kvf"

interface nonprimitive {
    date: Date
    another: {
        date: Date,
        another: {
            date: Date
        }
    }
}

let kvf: KVF
beforeAll(() => {
    kvf = new KVF('--date--')
    kvf.clearAll()
})
afterAll(() => kvf.clearAll())

describe('kvf non primitive type', () => {
    it('save object nonprimitive', () => {
        const key = 'key-obj-date'
        const value: nonprimitive = {
            date: new Date(),
            another: {
                date: new Date(),
                another: {
                    date: new Date()
                }
            }
        }
        kvf.set(key, value)
        const data = kvf.get(key) as nonprimitive
        expect(data.date.getDate()).toEqual(new Date().getDate())
        expect(data.another.date.getDate()).toEqual(new Date().getDate())
        expect(data.another.another.date.getDate()).toEqual(new Date().getDate())
    })
    it('save new Date()', () => {
        const key = 'key-date'
        const value = new Date()
        kvf.set(key, value)
        const data = kvf.get(key) as Date
        expect(data.getDate()).toEqual(new Date().getDate())
    })
})


interface GetterOnly {
    readonly prop: Date
}

function createGetterOnly(prop: any): GetterOnly {
    return {
        get prop() {
            return prop
        }
    }
}

describe('getter-only object', () => {
    it('save getter-only object', () => {
        const key = 'key-getter-only'
        const value: GetterOnly = createGetterOnly(new Date())
        kvf.set(key, value)
        const data = kvf.get(key) as GetterOnly
        expect(data.prop.getDate()).toEqual(new Date().getDate())
    })
})