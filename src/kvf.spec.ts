import { KVF } from './kvf';

let kvf: KVF

interface testtype {
    name: string
    num: number
    yes: boolean
    date: Date
    null: null
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
    it('save testtype', () => {
        const key = 'key-test'
        const value: testtype = {
            name: 'name',
            num: 12,
            yes: false,
            date: new Date(),
            null: null
        }
        kvf.set(key, value)
        const data = kvf.get(key) as testtype
        expect(data).toEqual(value)
        expect(data.date.getDate()).toEqual(new Date().getDate())
    })
    it('save new Date()', () => {
        const key = 'key-date'
        const value = new Date()
        kvf.set(key, value)
        const data = kvf.get(key) as Date
        expect(new Date(data)).toEqual(value)
    })
    it('save null', () => {
        const key = 'key-null'
        const value = null
        kvf.set(key, value)
        const data = kvf.get(key) as null
        expect(data).toEqual(value)
    })
})

