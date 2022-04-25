import { DateNPO } from "./non-primitive"

export function iterateTransform(obj: object): any {
    for (const key in obj) {
        Object(obj)[key] = DateNPO(Object(obj)[key] as Date)
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