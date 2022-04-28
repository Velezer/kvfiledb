
function DateNPO(v: Date) {
    return v instanceof Date ? `Date|${v.toJSON()}` : v
}

function Uint8ArrayNPO(v: Uint8Array) {
    return v instanceof Uint8Array ? `Uint8Array|[${Object.values(v)}]` : v
}

function BufferNPO(v: Buffer) {
    return v instanceof Buffer ? `Buffer|[${v.toJSON().data}]` : v
}

export const Transformers = [
    DateNPO,
    BufferNPO,
    Uint8ArrayNPO
]