import { KVF } from "../../kvf"



let kvf: KVF
beforeAll(() => {
    kvf = new KVF('--buffer--')
    kvf.clearAll()
})
afterAll(() => kvf.clearAll())


describe('Buffer', () => {
    it('save object contains Buffer', () => {
        const key = 'key-obj-Buffer'
        kvf.set(key, { buff: Buffer.from([1, 2, 3, 4]) })
        const { buff } = kvf.get(key)
        expect(buff).toEqual(Buffer.from({ buff: Buffer.from([1, 2, 3, 4]) }.buff.toJSON().data))
    })

    it('save Buffer', () => {
        const key = 'key-Buffer'
        const arr = [1, 2, 3]
        kvf.set(key, Buffer.from(arr))
        const data = kvf.get(key) as Buffer
        expect(data).toEqual(Buffer.from(arr))
    })
})

