# concisedb

A database library stores JSON file for Node.js.

[Here](https://github.com/Rotten-LKZ/concisedb/blob/main/update.md) is what updated every version if you want to know.

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

  The program will automatically update the content of the JSON file

  If the JSON file is exist, the program will compare the content of the JSON file with `data` you give. 

  The exist data of the JSON file will take the place of `data` you give

  and the non-exist data of the JSON file will use the default `data` which you give.
