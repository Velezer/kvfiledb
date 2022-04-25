function NonPrimitiveObject<T>(__type__: string, __value__: T) {
    return { __type__, __value__ }
}

export function DateNPO(__value__: Date) {
    if (__value__ instanceof Date) {
        return NonPrimitiveObject('date', __value__)
    }
    return __value__
}
