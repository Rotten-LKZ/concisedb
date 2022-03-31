
# Update

This file shows you what updated every version.

## Version 0.2.0 on 2022-04-01

1. Add API:

  - You can update the data from JSON file **manually**
  - To update the JSON file manually (For compatibility with previous versions, using `db.updateFile()` or `db.write()` are both okay)

  ```javascript
  const ConciseDb = require('concisedb')
  const path = require('path')

  const db = new ConciseDb(path.join(__dirname, 'db.json'), { test: [] })
  
  console.log(db.data)
  // Try changing the content of JSON file
  setTimeout(() => {
    db.readSync()
    console.log(db.data)
  }, 5000)

  const db2 = new ConciseDb(path.join(__dirname, 'db.json'), { test: [] }, { realtimeUpdate: false })

  console.log(db.data)

  // Try reading the content of JSON file
  db.data.test.push(2)
  db.writeSync()
  // or using db.updateFileSync()
  // If you want to use async APIs,
  // remember to use await or .then before you get data
  
  console.log(db.data)
  // Try reading the content of JSON file again
  ```

  ```typescript
  import ConciseDb from 'concisedb'
  import { join } from 'path'

  interface Database {
    test: number[]
  }

  const db = new ConciseDb<Database>(join(__dirname, 'db.json'), { test: [] })
  
  console.log(db.data)
  // Try changing the content of JSON file
  setTimeout(() => {
    db.readSync()
    console.log(db.data)
  }, 5000)

  const db2 = new ConciseDb<Database>(join(__dirname, 'db.json'), { test: [] }, { realtimeUpdate: false })

  console.log(db.data)

  // Try reading the content of JSON file
  db.data.test.push(2)
  db.writeSync()
  // or using db.updateFileSync()
  // If you want to use async APIs,
  // remember to use await or .then before you get data

  console.log(db.data)
  // Try reading the content of JSON file again
  ```

2. Support asynchronization

  Below are now supported API
  - `db.write()` and `db.writeSync()`
  - `db.read()` and `db.readSync()`
  - `db.updateFile()` and `db.updateFile()`

  Remember that **DO NOT** let two asynchronous functions run almost simultaneously


## Version 0.1.6 on 2022-03-21

Fix: Default options aren't work normally

## Version 0.1.5 on 2022-03-21

*This version was deleted because of an unrepaired bug*

Fix: Default options

## Version 0.1.4 on 2022-03-20

*This version was deleted because of an unrepaired bug*

This version is the same as Version 0.1.3.

## Version 0.1.3 on 2022-03-30

*This version was deleted because of redundant content*

1. Update docs
2. You can choose whether you need to make the program update the content of JSON file every time you change the value of data

## Version 0.1.2 on 2022-03-30

Complete README.md

*I forgot to complete README.md before updating Version 0.1.1*

## Version 0.1.1 on 2022-03-30 

*This version was deleted because of incomplete content*

1. Use `webpack` (Less storage using)
2. Fix: `<T>` changes but the JSON file doesn't change
3. Add: add notes to code files

## Version 0.1.0 on 2022-03-29

The first version updated.
