import { KVF } from './kvf';

let kvf: KVF

interface primitive {
    string: string
    number: number
    boolean: boolean
    null: null
}
interface nonprimitive {
    date: Date
    another: {
        date: Date,
        another: {
            date: Date
        }
    }
}

beforeAll(() => kvf = new KVF('--temp--'))
afterAll(() => kvf.clearAll())

describe('kvf with ttl', () => {
    it('save string', async () => {
        const key = 'key-ttl@valid.id'
        const value = 'value'
        const ttl = 1

        kvf.set(key, value, ttl)
        const data = kvf.get(key) as string
        expect(data).toEqual(value)

        await new Promise(resolve => setTimeout(resolve, ttl))

        const nodata = kvf.get(key) as string
        expect(nodata).toEqual(null)
    })
})
describe('kvf without ttl', () => {
    it('save string', async () => {
        const key = 'key@valid.id'
        const value = 'value'

        kvf.set(key, value)
        const data = kvf.get(key) as string
        expect(data).toEqual(value)
    })
    it('save object primitive', () => {
        const key = 'key-obj-primitive'
        const value: primitive = {
            string: 'name',
            number: 12,
            boolean: false,
            null: null
        }
        kvf.set(key, value)
        const data = kvf.get(key) as primitive
        expect(data).toEqual(value)
    })

    it('save null', () => {
        const key = 'key-null'
        const value = null
        kvf.set(key, value)
        const data = kvf.get(key) as null
        expect(data).toEqual(value)
    })
})

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
        expect(data.date.getMonth()).toEqual(new Date().getMonth())
        expect(data.another.date.getDate()).toEqual(new Date().getDate())
        expect(data.another.date.getMonth()).toEqual(new Date().getMonth())
        expect(data.another.another.date.getDate()).toEqual(new Date().getDate())
        expect(data.another.another.date.getMonth()).toEqual(new Date().getMonth())
    })
    it('save new Date()', () => {
        const key = 'key-date'
        const value = new Date()
        kvf.set(key, value)
        const data = kvf.get(key) as Date
        expect(data.getDate()).toEqual(new Date().getDate())
        expect(data.getMonth()).toEqual(new Date().getMonth())
        expect(data.getFullYear()).toEqual(new Date().getFullYear())
    })
})

