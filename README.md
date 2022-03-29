# puredb

A database library stores JSON file for Node.js.

## Usage

*You can also use other package manager like yarn and pnpm instead*

1. Install this library

```bash
npm install puredb
```

2. Example code

```javascript
const PureDb = require('puredb')
const path = require('path')

const db = new PureDb(path.join(__dirname, 'db.json'), { test: [] })

db.data.test.push(1) // It will update JSON file automatically by using Proxy
// So for performance, if you need to change the data many times at once
// you can use db.getData() to get a copy of data

console.log(db.data) // Output: { test: [ 1 ] }
```

3. This library also supports `TypeScript`
```typescript
import PureDb from 'puredb'
import { join } from 'path'

interface Database {
  test: number[]
}

const db = new PureDb<Database>(join(__dirname, 'db.json'), { test: [] })

db.data.test.push(1) // It will update JSON file automatically by using Proxy
// So for performance, if you need to change the data many times at once
// you can use db.getData() to get a copy of data

console.log(db.data) // Output: { test: [ 1 ] }
```
