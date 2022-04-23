# kvfiledb
 key-value file database with ttl

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

