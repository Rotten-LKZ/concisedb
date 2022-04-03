// @ts-nocheck
import LocalStorageAdapterSync from '../../src/adapters/localStorageAdapterSync'

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
  const adapter = new LocalStorageAdapterSync<Database>({
    key: 'localStorageAdapterSyncTest',
  })

  test('write', async () => {
    expect(adapter.write(init)).resolves.not.toBeUndefined()
  })

  test('read', () => {
    expect(adapter.read()).resolves.toMatchObject(init)
  })

  test('read with the file being deleted', () => {
    const t = async function() {
      window.localStorage().removeItem('localStorageAdapterSyncTest')
      return await adapter.read()
    }
    expect(t()).resolves.toBeFalsy()
  })
})
