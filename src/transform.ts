import { DateNPO } from "./non-primitive"

export function iterateTransform(obj: object): any {
    for (const key in obj) {
        if (key === '__type__' || key === '__value__') break
        // ---
        if (Object(obj)[key] instanceof Date) {
            Object(obj)[key] = DateNPO(Object(obj)[key] as Date)
            continue
        }
        // ---
        if (typeof Object(obj)[key] === 'object' && Object(obj)[key] !== null) {
            return transform(Object(obj)[key])
        }
    }
}

export function transform(obj: object): any {
    if (Object.keys(obj).length === 0) {
        obj = DateNPO(obj as Date)
    } else iterateTransform(obj)
    return obj
}