// @ts-nocheck
import fs from 'fs';
import ConciseDb from '../src'

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

describe('test use of class ConciseDb', () => {
  const db = new ConciseDb<Database>('./data/test.json', init)

  test('read data async', async () => {
    expect(await db.read()).not.toBeUndefined()
  })

  test('read data sync', () => {
    expect(db.readSync()).not.toBeUndefined()
  })

  test('check data of array', () => {
    const ran = Math.random().toString()
    db.data.friends.push(ran)
    expect(db.data.friends).toContain(ran)
  })

  test('check data of number', () => {
    db.data.age = 2
    expect(db.data.age).toBe(2)
  })

  test('check data of string', () => {
    db.data.name = 'Jack'
    expect(db.data.name).toBe('Jack')
  })

  test('check data of object', () => {
    db.data.teacher.name = 'Jack'
    expect(db.getData()).toMatchObject(db.data)
  })

  test('check getData', () => {
    expect(db.getData()).toMatchObject(db.data)
  })
})

describe('test use of class ConciseDb with realtimeUpdate false', () => {
  const db = new ConciseDb<Database>('./data/test.json', init, { realtimeUpdate: false })

  test('write file async', async () => {
    expect(await db.write()).not.toBeUndefined()
  })

  test('write file sync', () => {
    expect(db.writeSync()).toBeUndefined()
  })

  test('update file async', async () => {
    expect(await db.updateFile()).not.toBeUndefined()
  })

  test('update file sync', () => {
    expect(db.updateFileSync()).toBeUndefined()
  })
})

describe('test errors of methods', () => {
  test('input not object', () => {
    expect(() => {
      new ConciseDb<Database>('./data/test.json', 'test')
    }).toThrow('data is not an object')
  })

  const db = new ConciseDb<Database>('./data/test.json', init)

  test('file content is not an object sync', () => {
    expect(() => {
      fs.writeFileSync('./data/test.json', '123')
      db.readSync()
    }).toThrow('file content is not an object')
  })

  test('file content is not an object async', () => {
    expect(db.read()).rejects.toThrow('file content is not an object')
  })

  // After here, the JSON file has been deleted

  test('non-exist file before reading sync', () => {
    fs.rmSync('./data/test.json')
    expect(db.readSync()).toBeFalsy()
  })
  
  test('non-exist file before reading async', async () => {
    expect(await db.read()).toBeFalsy()
  })

  test('data is not defined', () => {
    expect(() => {
      new ConciseDb<Database>('./data/test.json')
    }).toThrow('data is not defined')
  })
})
