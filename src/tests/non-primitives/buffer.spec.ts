import { KVF } from "../../kvf"



let kvf: KVF
beforeAll(() => {
    kvf = new KVF('--buffer--')
    kvf.clearAll()
})
afterAll(() => kvf.clearAll())


describe('Buffer', () => {
    it('save object ccontains Buffer', () => {
        const key = 'key-obj-Buffer'
        const value = { arr: Buffer.from([1, 2, 3, 4]) }
        kvf.set(key, value)
        const { arr } = kvf.get(key)
        expect(arr).toEqual({ arr: Buffer.from([1, 2, 3, 4]) }.arr)
    })
    it('save Buffer', () => {
        const key = 'key-Buffer'
        const value = Buffer.from([1, 2, 3])
        kvf.set(key, value)
        const data = kvf.get(key)
        expect(data).toEqual(Buffer.from([1, 2, 3]))
    })
})

