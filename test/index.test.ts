// @ts-nocheck
import fs from 'fs';
import ConciseDb from '../src'

interface Database {
  name: string
  age: number
  friends: string[]
}

const init: Database = {
  name: 'John',
  age: 25,
  friends: ['Tom', 'Jerry'],
}

describe('test constructor of class ConciseDb', () => {
  test('input not object', () => {
    expect(() => {
      new ConciseDb<Database>('./data/test.json', 'test')
    }).toThrow('data is not an object')
  })

  test('data is not defined', () => {
    if (fs.existsSync('./data/test.json')) {
      expect(() => {
        new ConciseDb<Database>('./data/test.json')
      }).not.toThrow('data is not defined')
    } else {
      expect(() => {
        new ConciseDb<Database>('./data/test.json')
      }).toThrow('data is not defined')
    }
  })
})

describe('test use of class ConciseDb', () => {
  const db = new ConciseDb<Database>('./data/test.json', init)

  test('read data async', async () => {
    expect(await db.read()).not.toBeUndefined()
  })

  test('read data sync', () => {
    expect(db.readSync()).not.toBeUndefined()
  })

  test('check data', () => {
    const ran = Math.random().toString()
    db.data.friends.push(ran)
    expect(db.data.friends).toContain(ran)
  })

  test('check getData', () => {
    expect(db.data).toMatchObject(db.getData())
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
})
