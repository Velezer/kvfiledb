function NonPrimitiveObject<T>(__type__: string, __value__: T) {
        return { __type__, __value__ }
}

function DateNPO(__value__: Date | Object) {
    if (__value__ instanceof Date) {
        return NonPrimitiveObject('Date', __value__.toJSON())
    }
    return __value__
}

function Uint8ArrayNPO(__value__: Uint8Array | Object) {
    if (__value__ instanceof Uint8Array) {
        return NonPrimitiveObject('Uint8Array', Object.values(__value__))
    }
    return __value__
}

export const Transformers = [
    DateNPO,
    Uint8ArrayNPO
]