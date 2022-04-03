// @ts-nocheck
import { ConciseDb } from '../src'
import TestAdapter from '../src/adapters/TestAdapter'

interface Database {
  name: string
  age: number
  friends: string[]
  teacher: {
    name: string
    subject: string
  }
}

const init: Database = {
  name: 'John',
  age: 25,
  friends: ['Tom', 'Jerry'],
  teacher: {
    name: 'Peter',
    subject: 'Math',
  }
}

const diff: Database = {
  name: 'Peter',
  age: 83,
  friends: ['John', 'George'],
  teacher: {
    name: 'Alice',
    subject: 'Math',
  }
}

describe('test constructor of async ConciseDb', () => {
  test('data is not an object', () => {
    const adapter = new TestAdapter<Database>({ readType: 1 }, init)
    expect(new ConciseDb().init(adapter, ''))
      .rejects
      .toThrowError('Init ConciseDb: data is not an object')
  })

  test('data is not defined', () => {
    const adapter = new TestAdapter<Database>({ readType: 1 }, init)
    expect(new ConciseDb().init(adapter))
      .rejects
      .toThrowError('Init ConciseDb: data is not defined')
  })
})

describe('test use of async ConciseDb', () => {
  test('exist data cover default data', async () => {
    const adapter = new TestAdapter<Database>({ readType: 2 }, diff)
    const db = await new ConciseDb().init(adapter, init)
    expect(db.data).toEqual(diff)
  })

  test('read data', async () => {
    const adapter = new TestAdapter<Database>({ readType: 2 }, init)
    const db = await new ConciseDb().init(adapter, init)
    expect(db.data).toEqual(init)
  })

  test('write data', async () => {
    const adapter = new TestAdapter<Database>({ readType: 2 }, init)
    const db = await new ConciseDb().init(adapter, init)
    const newData: Database = {
      name: 'Tom',
      age: 26,
      friends: ['Jerry'],
      teacher: {
        name: 'Peter',
        subject: 'Math',
      }
    }
    db.data = newData
    expect(db.data).toEqual(newData)
  })

  test('getData()', async () => {
    const adapter = new TestAdapter<Database>({ readType: 2 }, init)
    const db = await new ConciseDb().init(adapter, init)
    expect(db.getData()).toEqual(init)
  })

  test('read() true', async () => {
    const adapter = new TestAdapter<Database>({ readType: 2 }, diff)
    const db = await new ConciseDb().init(adapter, init)
    expect(db.read()).resolves.toBeTruthy()
  })

  test('read() false', async () => {
    const adapter = new TestAdapter<Database>({ readType: 1 }, diff)
    const db = await new ConciseDb().init(adapter, init)
    expect(db.read()).resolves.toBeFalsy()
  })

  test('write()', async () => {
    const adapter = new TestAdapter<Database>({ readType: 2 }, diff)
    const db = await new ConciseDb().init(adapter, init)
    expect(db.write()).resolves.not.toBeUndefined()
  })
})
