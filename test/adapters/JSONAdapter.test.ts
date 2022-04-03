// @ts-nocheck
import fs from 'fs'
import JSONAdapter from '../../src/adapters/JSONAdapter'

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
  const adapter = new JSONAdapter<Database>({
    filePath: './data/JSONAdapterTest.json',
  })

  test('write', async () => {
    expect(adapter.write(init)).resolves.not.toBeUndefined()
  })

  test('read', () => {
    expect(adapter.read()).resolves.toMatchObject(init)
  })

  test('read with the file being deleted', () => {
    const t = async function() {
      fs.rmSync('./data/JSONAdapterTest.json')
      return await adapter.read()
    }
    expect(t()).resolves.toBeFalsy()
  })
})
