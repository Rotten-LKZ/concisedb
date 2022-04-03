// @ts-nocheck
import fs from 'fs'
import JSONAdapterSync from '../../src/adapters/JSONAdapterSync'

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

describe('test JSONAdapterSync', () => {
  const adapter = new JSONAdapterSync<Database>({
    filePath: './data/JSONAdapterSyncTest.json',
  })

  test('write', () => {
    expect(adapter.write(init)).not.toBeUndefined()
  })

  test('read', () => {
    expect(adapter.read()).toMatchObject(init)
  })

  test('read with the data not object', () => {
    fs.writeFileSync('./data/JSONAdapterSyncTest.json', '123')
    expect(() => { adapter.read() }).toThrow('JSONSync Adapter: file content is not an object')
  })

  test('read with the file being deleted', () => {
    fs.rmSync('./data/JSONAdapterSyncTest.json')
    expect(adapter.read()).toBeFalsy()
  })
})
