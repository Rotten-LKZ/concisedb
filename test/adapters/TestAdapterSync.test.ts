

// @ts-nocheck
import TestAdapterSync from '../../src/adapters/TestAdapterSync'

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

describe('test TestAdapterSync', () => {
  test('read() with readType = 1 (return false)', () => {
    const adapter = new TestAdapterSync<Database>({
      readType: 1,
    }, init)
    expect(adapter.read()).toBeFalsy()
  })

  test('read() with readType = 2 (return data (object))', () => {
    const adapter = new TestAdapterSync<Database>({
      readType: 2,
    }, init)
    expect(adapter.read()).toEqual(init)
  })

  test('read() with readType = 3 (return data (string))', () => {
    const adapter = new TestAdapterSync<Database>({
      readType: 3,
    }, init)
    expect(adapter.read()).toEqual(JSON.stringify(init))
  })

  test('read() with readType = 4 (return no data (string))', () => {
    const adapter = new TestAdapterSync<Database>({
      readType: 4,
    }, init)
    expect(adapter.read()).not.toEqual(init)
  })

  test('read() with readType > 4 (return false)', () => {
    const adapter = new TestAdapterSync<Database>({
      readType: 5,
    }, init)
    expect(adapter.read()).toBeFalsy()
  })

  test('write()', () => {
    const adapter = new TestAdapterSync<Database>({
      readType: 5,
    }, init)
    expect(adapter.write(init)).not.toBeUndefined()
  })
})
