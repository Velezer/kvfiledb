import { DateNPO } from "./non-primitive"

function iterateTransform(obj: object): any {
    for (const key in obj) {
        const value = Object(obj)[key]
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