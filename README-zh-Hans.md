# concisedb

[![npm version](https://badge.fury.io/js/concisedb.svg)](https://badge.fury.io/js/concisedb)
[![codecov](https://codecov.io/gh/Rotten-LKZ/concisedb/branch/pub/graph/badge.svg?token=6WFQG040FA)](https://codecov.io/gh/Rotten-LKZ/concisedb)
[![GitHub Stars](https://badgen.net/github/stars/Rotten-LKZ/concisedb)](https://github.com/Rotten-LKZ/concisedb)
[![NPM Downloads](https://badgen.net/npm/dt/concisedb)](https://www.npmjs.com/package/concisedb)
[![License](https://img.shields.io/npm/l/concisedb)](https://github.com/Rotten-LKZ/concisedb/blob/main/LICENSE)
[![Package size](https://img.shields.io/bundlephobia/min/concisedb)](https://www.npmjs.com/package/concisedb)

[English](https://github.com/Rotten-LKZ/concisedb/blob/main/README.md) | [简体中文](https://github.com/Rotten-LKZ/concisedb/blob/main/README-zh-Hans.md)

Node.js 存储数据到 JSON 文件的库

如果你想知道每个版本的更新内容，请点击 [这里](https://github.com/Rotten-LKZ/concisedb/blob/main/update.md)

[主页](https://www.concisedb.top/) | [v0 文档](https://v0.concisedb.top/) | [v1 文档](https://v1.concisedb.top/)

## 用法

### 基础用法

1. 下载库

*你可以使用其他你喜欢的包管理器如 `yarn` and `pnpm` 代替*

```bash
npm install concisedb
```

2. 示例代码

*本库支持 `TypeScript`*

```javascript
const ConciseDbSync = require('concisedb').ConciseDbSync
const JSONAdapterSync = require('concisedb').JSONAdapterSync
const path = require('path')

const adapter = new JSONAdapterSync({
  filePath: path.join(__dirname, 'db.json')
})

// 适配器 (adapter), 默认数据 （可选）, 是否需要实时更新 （默认： true）
const db = new ConciseDbSync(adapter, { test: [] })

db.data.test.push(1)

console.log(db.data) // 输出： { test: [ 1 ] }

// 尝试更改 JSON 文件的内容
setTimeout(() => {
  db.read()
  console.log(db.data) // 输出：取决于你的更改
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

// 适配器 (adapter), 默认数据 （可选）, 是否需要实时更新 （默认： true）
const db = new ConciseDbSync(adapter, { test: [] })

db.data.test.push(1)

console.log(db.data) // 输出： { test: [ 1 ] }

// 尝试更改 JSON 文件的内容
setTimeout(() => {
  db.read()
  console.log(db.data) // 输出：取决于你的更改
}, 10000)
```

> 通过使用 Proxy，JSON 文件里的数据会自动更新
>
> 如果你需要一次性大量修改 `data`，可以使用 `db.getData()` 获取 `data` 的副本

3. 关闭自动更新。

```javascript
const ConciseDbSync = require('concisedb').ConciseDbSync
const JSONAdapterSync = require('concisedb').JSONAdapterSync
const path = require('path')

const adapter = new JSONAdapterSync({
  filePath: path.join(__dirname, 'db.json')
})
// 将 false 传入第三个参数
const db = new ConciseDbSync(adapter, { test: [] }, false)

db.data.test.push(1)

// 用 write 手动更新 JSON 文件的内容
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
// 将 false 传入第三个参数
const db = new ConciseDbSync(adapter, { test: [] }, false)

db.data.test.push(1)

// 用 write 手动更新 JSON 文件的内容
db.write()
```

4. 异步 API

> **`db.getData()` 仍然是一个同步方法**

```javascript
const ConciseDb = require('concisedb').ConciseDb
const JSONAdapter = require('concisedb').JSONAdapter
const path = require('path')

(async () => {
  const adapter = new JSONAdapter({
    filePath: path.join(__dirname, 'db.json')
  })
  const db = new ConciseDb()
  // 方法 db.init 应该在初始化类后被调用
  // 并且需要用 await 等待方法执行完成
  // 当然，可以用 .then 代替 await
  await db.init(adapter, { test: [] })

  db.data.test.push(1)

  // db.getData() 仍然是一个同步方法
  console.log(db.data, db.getData()) // 输出： { test: [ 1 ] } { test: [ 1 ] }

  // 尝试更改 JSON 文件的内容
  setTimeout(async () => {
    await db.read()
    console.log(db.data) // 输出：取决于你的更改
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
  // 方法 db.init 应该在初始化类后被调用
  // 并且需要用 await 等待方法执行完成
  // 当然，可以用 .then 代替 await
  await db.init<Database>(adapter, init)

  db.data.test.push(1)

  // db.getData() 仍然是一个同步方法
  console.log(db.data, db.getData()) // 输出： { test: [ 1 ] } { test: [ 1 ] }

  // 尝试更改 JSON 文件的内容
  setTimeout(async () => {
    await db.read()
    console.log(db.data) // 输出：取决于你的更改
  }, 10000)
})()
```

### 高阶用法

#### 制作你自己的适配器 (adapter)

*你需要集成的抽象类*

- 同步

```typescript
/**
 * 同步存储的适配器 (adapter)
 */
export abstract class AdapterSync<T extends object, R> {
  public adapterOptions: R
  constructor(adapterOptions: R) {
    this.adapterOptions = adapterOptions
  }

  /**
   * 写入数据
   * @param data 需要写入的数据
   * @returns 写入是否成功
   */
  public abstract write(data: T): boolean
  /**
   * 读取数据
   * @returns
   *  如果你返回字符串，ConciseDb 会帮你尝试解析成类型 T
   *  如果你返回 false，代表着存储有问题或者不存在
   *  如果你返回类型 T （类型 T 是对象类型），ConciseDb 会直接把它当成数据。
   */
  public abstract read(): T | false | string
}
```

- 异步

```typescript
/**
 * 异步存储的适配器 (adapter)
 */
export abstract class Adapter<T extends object, R> {
  public adapterOptions: R
  constructor(adapterOptions: R) {
    this.adapterOptions = adapterOptions
  }

  /**
   * 写入数据
   * @param data 需要写入的数据
   * @returns 写入是否成功
   */
  public abstract write(data: T): Promise<boolean>
  /**
   * 读取数据
   * @returns
   *  如果你返回字符串，ConciseDb 会帮你尝试解析成类型 T
   *  如果你返回 false，代表着存储有问题或者不存在
   *  如果你返回类型 T （类型 T 是对象类型），ConciseDb 会直接把它当成数据。
   */
  public abstract read(): Promise<T | false | string>
}
```

例如： 

- 同步

```typescript
import { AdapterSync } from 'concisedb'

interface TestAdapterSyncOptions {
  readType: number
}

/**
 * 测试用适配器 (adapter)
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

- 异步

```typescript
import { Adapter } from 'concisedb'

interface TestAdapterOptions {
  readType: number
}

/**
 * 测试用适配器 (adapter)
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

同步适配器 (adapter) 用 `ConcisDbSync` 初始化

异步适配器 (adapter) 用 `ConcisDb` 初始化

## 版本选择：v0 和 v1

`concisedb` 现在有两个主要版本。以下是他们的示例代码。

> *他们都支持异步 API*

- v0:
```javascript
const ConciseDb = require('concisedb')
const path = require('path')

const db = new ConciseDb(path.join(__dirname, 'db.json'), { test: [] })

db.data.test.push(1)

console.log(db.data) // 输出： { test: [ 1 ] }
```
- v1:
```javascript
const ConciseDbSync = require('concisedb').ConciseDbSync
const JSONAdapterSync = require('concisedb').JSONAdapterSync
const path = require('path')

const adapter = new JSONAdapterSync({
  filePath: path.join(__dirname, 'db.json')
})

// 适配器 (Adapter), 默认数据 （可选）, 是否需要实时更新 （默认： true）
const db = new ConciseDbSync(adapter, { test: [] })

db.data.test.push(1)

console.log(db.data) // 输出： { test: [ 1 ] }
```

所以就是 v1 允许你使用 `适配器 (adapter)` 在不同地方存储数据。

但是，作者仍然会维护 v0 版本。

[GitHub 上查看 v0 分支](https://github.com/Rotten-LKZ/concisedb/tree/v0)
