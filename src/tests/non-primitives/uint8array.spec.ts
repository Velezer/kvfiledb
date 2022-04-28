import { KVF } from "../../kvf"



let kvf: KVF
beforeAll(() => {
    kvf = new KVF('--uint8array--')
    kvf.clearAll()
})
afterAll(() => kvf.clearAll())


describe('Uint8Array', () => {
    it('save object contains Uint8Array', () => {
        const key = 'key-obj-uint8array'
        const value = { arr: new Uint8Array([1, 2, 3, 4]) }
        kvf.set(key, value)
        const { arr } = kvf.get(key)
        expect(arr).toEqual({ arr: new Uint8Array([1, 2, 3, 4]) }.arr)
    })
    it('save Uint8Artay', () => {
        const key = 'key-uint8array'
        const value = new Uint8Array([1, 2, 3])
        kvf.set(key, value)
        const data = kvf.get(key)
        expect(data).toEqual(new Uint8Array([1, 2, 3]))
    })
})

