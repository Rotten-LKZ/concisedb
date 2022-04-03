
import { Adapter } from '../async'

interface TestAdapterOptions {
  readType: number
}

/**
 * Test adapter
 */
export default class TestAdapter<T extends object> extends Adapter<T, TestAdapterOptions> {
  private _data: T
  private readType: number
  constructor(options: TestAdapterOptions, defualtData: T) {
    super(options)
    this._data = defualtData
    this.readType = options.readType
  }

  public async read(): Promise<T | false | string> {
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

  public async write(_data: T): Promise<boolean> {
    return Math.floor(Math.random() * (264 - 1 + 1) + 1) % 2 === 0
  }
}
