# concisedb

[![npm version](https://badge.fury.io/js/concisedb.svg)](https://badge.fury.io/js/concisedb)
[![codecov](https://codecov.io/gh/Rotten-LKZ/concisedb/branch/pub/graph/badge.svg?token=6WFQG040FA)](https://codecov.io/gh/Rotten-LKZ/concisedb)
[![GitHub Stars](https://badgen.net/github/stars/Rotten-LKZ/concisedb)](https://github.com/Rotten-LKZ/concisedb)
[![NPM Downloads](https://badgen.net/npm/dt/concisedb)](https://www.npmjs.com/package/concisedb)
[![License](https://img.shields.io/npm/l/concisedb)](https://github.com/Rotten-LKZ/concisedb/blob/main/LICENSE)
[![Package size](https://img.shields.io/bundlephobia/min/concisedb)](https://www.npmjs.com/package/concisedb)

[English](https://github.com/Rotten-LKZ/concisedb/blob/main/README.md) | [简体中文](https://github.com/Rotten-LKZ/concisedb/blob/main/README-zh-Hans.md)

A database library stores JSON file for Node.js.

[Here](https://github.com/Rotten-LKZ/concisedb/blob/main/update.md) is what updated every version if you want to know.

[Homepage](https://www.concisedb.top/) | [Document for v0](https://v0.concisedb.top/) | [Document for v1](https://v1.concisedb.top/)

## Usage

### Basic usage

1. Install this library

*You can also use other package managers like `yarn` and `pnpm` instead*

```bash
npm install concisedb
```

2. Example code

*This library also supports `TypeScript`*

```javascript
const ConciseDbSync = require('concisedb').ConciseDbSync
const JSONAdapterSync = require('concisedb').JSONAdapterSync
const path = require('path')

const adapter = new JSONAdapterSync({
  filePath: path.join(__dirname, 'db.json')
})

// Adapter, Default data (optional), Whether realtime update is needed (default: true)
const db = new ConciseDbSync(adapter, { test: [] })

db.data.test.push(1)

console.log(db.data) // Output: { test: [ 1 ] }

// Try modifying the content of db.json
setTimeout(() => {
  db.read()
  console.log(db.data) // Output: Depends on what you modified
}, 10000)
```

```typescript
import { ConciseDbSync, JSONAdapterSync } from 'concisedb'
import { join } from 'path'

interface Database {
  test: number[];
  username: string;
}

const init: Database = {
  test: [],
  username: 'John',
}

const adapter = new JSONAdapterSync({
  filePath: join(__dirname, 'db.json')
})

// Adapter, Default data (optional), Whether realtime update is needed (default: true)
const db = new ConciseDbSync(adapter, { test: [] })

db.data.test.push(1)

console.log(db.data) // Output: { test: [ 1 ] }

// Try modifying the content of db.json
setTimeout(() => {
  db.read()
  console.log(db.data) // Output: Depends on what you modified
}, 10000)
```

> The data will automatically update to JSON file by using Proxy
>
> So you can use `db.getData()` to get a copy of `data` if you need to change the `data` many times at once

3. Don't update automatically

```javascript
const ConciseDbSync = require('concisedb').ConciseDbSync
const JSONAdapterSync = require('concisedb').JSONAdapterSync
const path = require('path')

const adapter = new JSONAdapterSync({
  filePath: path.join(__dirname, 'db.json')
})
// Give false to the third argument
const db = new ConciseDbSync(adapter, { test: [] }, false)

db.data.test.push(1)

// Use write to update the content to JSON file manully
db.write()
```

```typescript
import { ConciseDbSync, JSONAdapterSync } from 'concisedb'
import { join } from 'path'

interface Database {
  test: number[];
  username: string;
}

const init: Database = {
  test: [],
  username: 'John',
}

const adapter = new JSONAdapterSync({
  filePath: join(__dirname, 'db.json')
})
// Give false to the third argument
const db = new ConciseDbSync(adapter, { test: [] }, false)

db.data.test.push(1)

// Use write to update the content to JSON file manully
db.write()
```

4. Async APIs

> **`db.getData()` remains a synchronous method**

```javascript
const ConciseDb = require('concisedb').ConciseDb
const JSONAdapter = require('concisedb').JSONAdapter
const path = require('path')

(async () => {
  const adapter = new JSONAdapter({
    filePath: path.join(__dirname, 'db.json')
  })
  const db = new ConciseDb()
  // Method db.init should be called after initing the class
  // And should use await to wait this function complete
  // Of course, using .than instand of await is okay
  await db.init(adapter, { test: [] })

  db.data.test.push(1)

  // db.getData() remains a synchronous method
  console.log(db.data, db.getData()) // Output: { test: [ 1 ] } { test: [ 1 ] }

  // Try modifying the content of db.json
  setTimeout(async () => {
    await db.read()
    console.log(db.data) // Output: Depends on what you modified
  }, 10000)
})()
```

```typescript
import { ConciseDb, JSONAdapter } from 'concisedb'
import { join } from 'path'

(async () => {
  interface Database {
    test: number[];
    username: string;
  }

  const init: Database = {
    test: [],
    username: 'John',
  }

  const adapter = new JSONAdapter({
    filePath: join(__dirname, 'db.json')
  })
  const db = new ConciseDb()
  // Method db.init should be called after initing the class
  // And should use await to wait this function complete
  // Of course, using .than instand of await is okay
  await db.init<Database>(adapter, init)

  db.data.test.push(1)

  // db.getData() remains a synchronous method
  console.log(db.data, db.getData()) // Output: { test: [ 1 ] } { test: [ 1 ] }

  // Try modifying the content of db.json
  setTimeout(async () => {
    await db.read()
    console.log(db.data) // Output: Depends on what you modified
  }, 10000)
})()
```

### Advanced usage

#### Make your own adapter

*Abstract class you need to extends*

- Synchronization

```typescript
/**
 * Adapter for synchronous storage
 */
export abstract class AdapterSync<T extends object, R> {
  public adapterOptions: R
  constructor(adapterOptions: R) {
    this.adapterOptions = adapterOptions
  }

  /**
   * Write data
   * @param data the data should be written
   * @returns whether the write is successful
   */
  public abstract write(data: T): boolean
  /**
   * Read data
   * @returns
   *  If you return string, ConciseDb will help you try parsing it to T.
   *  If you return false, it means there may be something wrong with the storage or non-exist.
   *  If you return T (typeof T is object), ConciseDb will use it as the data directly.
   */
  public abstract read(): T | false | string
}
```

- Asynchronization

```typescript
/**
 * Adapter for asynchronous storage
 */
export abstract class Adapter<T extends object, R> {
  public adapterOptions: R
  constructor(adapterOptions: R) {
    this.adapterOptions = adapterOptions
  }

  /**
   * Write data
   * @param data the data should be written
   * @returns whether the write is successful
   */
  public abstract write(data: T): Promise<boolean>
  /**
   * Read data
   * @returns
   *  If you return string, ConciseDb will help you try parsing it to T.
   *  If you return false, it means there may be something wrong with the storage or non-exist.
   *  If you return T (typeof T is object), ConciseDb will use it as the data directly.
   */
  public abstract read(): Promise<T | false | string>
}
```

Example: 

- Synchronization

```typescript
import { AdapterSync } from 'concisedb'

interface TestAdapterSyncOptions {
  readType: number
}

/**
 * Test adapter
 */
export default class TestAdapterSync<T extends object> extends AdapterSync<T, TestAdapterSyncOptions> {
  private _data: T
  private readType: number
  constructor(options: TestAdapterSyncOptions, defualtData: T) {
    super(options)
    this._data = defualtData
    this.readType = options.readType
  }

  public read(): T | false | string {
    if (this.readType === 1)
      return false
    else if (this.readType === 2)
      return this._data
    else if (this.readType === 3)
      return JSON.stringify(this._data)
    else if (this.readType === 4)
      return '123'
    else
      return false
  }

  public write(_data: T): boolean {
    return Math.floor(Math.random() * (264 - 1 + 1) + 1) % 2 === 0
  }
}
```

- Asynchronization

```typescript
import { Adapter } from 'concisedb'

interface TestAdapterOptions {
  readType: number
}

/**
 * Test adapter
 */
export default class TestAdapter<T extends object> extends Adapter<T, TestAdapterOptions> {
  private _data: T
  private readType: number
  constructor(options: TestAdapterOptions, defualtData: T) {
    super(options)
    this._data = defualtData
    this.readType = options.readType
  }

  public async read(): Promise<T | false | string> {
    if (this.readType === 1)
      return false
    else if (this.readType === 2)
      return this._data
    else if (this.readType === 3)
      return JSON.stringify(this._data)
    else if (this.readType === 4)
      return '123'
    else
      return false
  }

  public async write(_data: T): Promise<boolean> {
    return Math.floor(Math.random() * (264 - 1 + 1) + 1) % 2 === 0
  }
}
```

Synchronization adapters use `ConciseDbSync` to init

Asynchronization adapters use `ConciseDb` to init

## Version choose: v0 and v1

`concisedb` has two main versions now. Below are their example codes.

> *They all support async APIs*

- v0:
```javascript
const ConciseDb = require('concisedb')
const path = require('path')

const db = new ConciseDb(path.join(__dirname, 'db.json'), { test: [] })

db.data.test.push(1)

console.log(db.data) // Output: { test: [ 1 ] }
```
- v1:
```javascript
const ConciseDbSync = require('concisedb').ConciseDbSync
const JSONAdapterSync = require('concisedb').JSONAdapterSync
const path = require('path')

const adapter = new JSONAdapterSync({
  filePath: path.join(__dirname, 'db.json')
})

// Adapter, Default data (optional), Whether realtime update is needed (default: true)
const db = new ConciseDbSync(adapter, { test: [] })

db.data.test.push(1)

console.log(db.data) // Output: { test: [ 1 ] }
```

So v1 allows you to use `adapter` to store in different places.

However, v0 will still be maintained by the author.

[View branch v0 on GitHub](https://github.com/Rotten-LKZ/concisedb/tree/v0)
