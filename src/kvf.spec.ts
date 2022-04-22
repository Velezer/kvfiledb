import { KVF } from './kvf';

let kvf: KVF

interface testtype {
    name: string
    test: number
    yes: boolean
}

beforeAll(() => kvf = new KVF())
afterAll(() => kvf.clearAll())

describe('kvf without ttl', () => {
    it('save string', () => {
        const key = 'key'
        const value = 'value'
        kvf.set(key, value)
        const data = kvf.get(key) as string
        expect(data).toEqual(value)
    })
    it('save testtype', () => {
        const keytest = 'key-test'
        const value: testtype = {
            name: 'name',
            test: 12,
            yes: false
        }
        kvf.set(keytest, value)
        const data = kvf.get(keytest) as testtype
        expect(data).toEqual(value)
    })
})

describe('kvf with ttl', () => {
    it('save string', async () => {
        const key = 'key-ttl'
        const value = 'value'
        const ttl = 10

        kvf.set(key, value, ttl)
        const data = kvf.get(key) as string
        expect(data).toEqual(value)

        await new Promise(resolve => setTimeout(resolve, ttl))

        const nodata = kvf.get(key) as string
        expect(nodata).toEqual(null)
    })
})