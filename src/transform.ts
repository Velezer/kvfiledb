import { Transformers } from "./non-primitive";

function iterateTransform(obj: object): any {
    for (const key in obj) {
        const value = Object(obj)[key]
        try {
            delete Object(obj)[key] // handle getter-only object
        } catch (err) { }
        for (const t of Transformers) {
            Object(obj)[key] = t(value)
            if (Object(obj)[key] !== value) break
        }

        if (typeof Object(obj)[key] === 'object' && Object(obj)[key] !== null) {
            return iterateTransform(Object(obj)[key])
        }
    }
}

export function transform(obj: object): any {
    const value = obj
    for (const t of Transformers) {
        obj = t(obj as any) as any
        if (obj !== value) return obj
    }
    iterateTransform(obj)
    return obj
}

