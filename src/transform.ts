import { DateNPO, Uint8ArrayNPO } from "./non-primitive"

function iterateTransform(obj: object): any {
    for (const key in obj) {
        const value = Object(obj)[key]
        if (value instanceof Uint8Array) {
            Object(obj)[key] = Uint8ArrayNPO(value)
            continue
        }
        delete Object(obj)[key]
        Object(obj)[key] = DateNPO(value as Date)
        if ('__type__' in Object(Object(obj)[key]) || '__value__' in Object(Object(obj)[key])) continue
        if (typeof Object(obj)[key] === 'object' && Object(obj)[key] !== null) {
            return iterateTransform(Object(obj)[key])
        }
    }
}

export function transform(obj: object): any {
    if (Object.keys(obj).length === 0) {
        obj = DateNPO(obj as Date)
    } else iterateTransform(obj)
    return obj
}