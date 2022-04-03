
import { AdapterSync } from '..'

interface TestAdapterSyncOptions {
  readType: number
}

/**
 * Test adapter
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
