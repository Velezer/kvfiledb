# kvfiledb
key-value file database with ttl.
it's more like key-value document database but saved as a file per key-value pair.

# install
```
npm i kvfiledb
```

# usage
```ts
import { KVF } from 'kvfiledb'

const kvf = new KVF()
kvf.set('key', data, 1000)
kvf.get('key')
kvf.clear('key')
kvf.clearAll()
```

# features
- save primitive types
- save json type
- save non primitive types

# supported non primitive types
- Date
- Buffer
- Uint8Array

# note on non primitive types
if you have 
```ts
const data = new Date()
kvf.set('key', data)
```
it will be saved as
```json
"Date|2022-04-26T04:50:15.171Z"
```
you don't need to parse it. this package will do it for you
```ts
const getData = kvf.get('key') as Date // this is a Date type regardless you do type cast or not
```


