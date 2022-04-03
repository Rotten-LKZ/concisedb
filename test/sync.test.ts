// @ts-nocheck
import { ConciseDbSync } from '../src'
import TestAdapterSync from '../src/adapters/TestAdapterSync'

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

describe('test constructor of sync ConciseDb', () => {
  test('data is not an object', () => {
    const adapter = new TestAdapterSync<Database>({ readType: 1 }, init)
    expect(() => {
      new ConciseDbSync(adapter, '')
    }).toThrowError('Init ConciseDb: data is not an object')
  })

  test('data is not defined', () => {
    const adapter = new TestAdapterSync<Database>({ readType: 1 }, init)
    expect(() => {
      new ConciseDbSync(adapter)
    }).toThrowError('Init ConciseDb: data is not defined')
  })
})

describe('test use of sync ConciseDb', () => {
  test('exist data cover default data', () => {
    const adapter = new TestAdapterSync<Database>({ readType: 2 }, diff)
    const db = new ConciseDbSync(adapter, init)
    expect(db.data).toEqual(diff)
  })

  test('read data', () => {
    const adapter = new TestAdapterSync<Database>({ readType: 2 }, init)
    const db = new ConciseDbSync(adapter, init)
    expect(db.data).toEqual(init)
  })

  test('write data', () => {
    const adapter = new TestAdapterSync<Database>({ readType: 2 }, init)
    const db = new ConciseDbSync(adapter, init)
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

  test('getData()', () => {
    const adapter = new TestAdapterSync<Database>({ readType: 2 }, init)
    const db = new ConciseDbSync(adapter, init)
    expect(db.getData()).toEqual(init)
  })

  test('read() true', () => {
    const adapter = new TestAdapterSync<Database>({ readType: 2 }, diff)
    const db = new ConciseDbSync(adapter, init)
    expect(db.read()).toBeTruthy()
  })

  test('read() false', () => {
    const adapter = new TestAdapterSync<Database>({ readType: 1 }, diff)
    const db = new ConciseDbSync(adapter, init)
    expect(db.read()).toBeFalsy()
  })

  test('write()', () => {
    const adapter = new TestAdapterSync<Database>({ readType: 2 }, diff)
    const db = new ConciseDbSync(adapter, init)
    expect(db.write()).not.toBeUndefined()
  })
})
