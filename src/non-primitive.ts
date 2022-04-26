function NonPrimitiveObject<T>(__type__: string, __value__: T) {
    return { __type__, __value__ }
}

export function DateNPO(__value__: Date) {
    if (__value__ instanceof Date) {
        return NonPrimitiveObject('Date', __value__)
    }
    return __value__
}

export function Uint8ArrayNPO(__value__: Uint8Array) {
    if (__value__ instanceof Uint8Array) {
        return NonPrimitiveObject('Uint8Array', __value__)
    }
    return __value__
}
