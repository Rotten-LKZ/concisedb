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

[API 文档（英文）](https://v0.concisedb.top/)

## 用法

### 基础用法

1. 下载库

*你可以用其他你喜欢的包管理器如 `yarn` 和 `pnpm` 替代*

```bash
npm install concisedb@0.2.3
```

2. 示例代码

*这个库支持 `TypeScript`*

```javascript
const ConciseDb = require('concisedb')
const path = require('path')

// 第三个参数是这个类的设置选项
// 如果你想知道有什么设置可以改变，访问 https://v0.concisedb.top/
const db = new ConciseDb(path.join(__dirname, 'db.json'), { test: [] })

db.data.test.push(1) // 通过 Proxy，这个变量改变的值会自动更新到文件里
// 所以为了性能，如果你一次性要改变 data 的值
// 你可以使用 db.getData()，可以获取 data 的一份复制的值
// 当然，你可以给这个类的第三个参数 { realtimeUpdate: false }
// 可以阻止程序自动更新 JSON 文件

console.log(db.data) // 输出： { test: [ 1 ] }
```

```typescript
import ConciseDb from 'concisedb'
import { join } from 'path'

interface Database {
  test: number[]
}

// 第三个参数是这个类的设置选项
// 如果你想知道有什么设置可以改变，访问 https://v0.concisedb.top/
const db = new ConciseDb<Database>(join(__dirname, 'db.json'), { test: [] })

db.data.test.push(1) // 通过 Proxy，这个变量改变的值会自动更新到文件里
// 所以为了性能，如果你一次性要改变 data 的值
// 你可以使用 db.getData()，可以获取 data 的一份复制的值
// 当然，你可以给这个类的第三个参数 { realtimeUpdate: false }
// 可以阻止程序自动更新 JSON 文件

console.log(db.data) // 输出： { test: [ 1 ] }
```

3. 不要担心你改变了 `T` 的类型

  程序会自动更新 JSON 文件的内容

  如果 JSON 文件存在，程序会比较 JSON 文件的内容和你传进来的 `data` 参数。

  JSON 文件里面存在的数据会替换你给的 `data` 参数

  并且 JSON 文件里面不存在的数据会使用你传进来的默认的 `data` 作为值。

### 高级用法

#### 手动读取 JSON 文件的数据

如果你改变了 JSON 文件的内容并且你想获取最新内容，你可以用 `db.read()` 或 `db.readSync()` 获取

```javascript
const ConciseDb = require('concisedb')
const path = require('path')

const db = new ConciseDb(path.join(__dirname, 'db.json'), { test: [] })

console.log(db.data)
// 尝试改变 JSON 文件的内容
setTimeout(() => {
  db.readSync()
  console.log(db.data)
}, 5000)
db.read()
```

```typescript
import ConciseDb from 'concisedb'
import { join } from 'path'

interface Database {
  test: number[]
}

const db = new ConciseDb<Database>(join(__dirname, 'db.json'), { test: [] })

console.log(db.data)
// 尝试改变 JSON 文件的内容
setTimeout(() => {
  db.readSync()
  console.log(db.data)
}, 5000)
```

### 异步和同步 API

库提供了三个API，并且都支持异步：

- `db.read()` 和 `db.readSync()`
- `db.write()` 和 `db.writeSync()`
- `db.updateFile()` 和 `db.updateFileSync()`

*为了兼容性，程序仍然声明了 `db.updateFile()` 和 `db.updateFileSync()`。它们其实和 `db.write()` 及 `db.writeSync()` 是一样的。*
