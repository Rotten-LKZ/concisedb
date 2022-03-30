# concisedb

A database library stores JSON file for Node.js.

## Usage

1. Install this library

*You can also use other package managers like yarn and pnpm instead*

```bash
npm install concisedb
```

2. Example code

*This library also supports `TypeScript`*

```javascript
const ConciseDb = require('concisedb')
const path = require('path')

const db = new ConciseDb(path.join(__dirname, 'db.json'), { test: [] })

db.data.test.push(1) // It will update JSON file automatically by using Proxy
// So for performance, if you need to change the data many times at once
// you can use db.getData() to get a copy of data

console.log(db.data) // Output: { test: [ 1 ] }
```

```typescript
import ConciseDb from 'concisedb'
import { join } from 'path'

interface Database {
  test: number[]
}

const db = new ConciseDb<Database>(join(__dirname, 'db.json'), { test: [] })

db.data.test.push(1) // It will update JSON file automatically by using Proxy
// So for performance, if you need to change the data many times at once
// you can use db.getData() to get a copy of data

console.log(db.data) // Output: { test: [ 1 ] }
```

3. Don't worry if you change the type of `T`

  It will be 
