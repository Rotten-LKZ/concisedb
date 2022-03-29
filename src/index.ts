
import fs from 'fs'

/**
 * Deep proxy
 * @param obj the object you need to use proxy
 * @param cb callback
 * @returns Proxy
 */
function deepProxy<T extends object>(obj: T, cb: Function) {
  if (typeof obj === 'object') {
    for (const key in obj) {
      if (typeof obj[key] === 'object')
        // @ts-expect-error - no wrong
        obj[key] = deepProxy(obj[key], cb)
    }
  }

  return new Proxy(obj, {
    set(target, props, value, receiver) {
      if (typeof value === 'object')
        value = deepProxy(value, cb)

      return cb(target, props, value, receiver)
    },
  })
}

export default class ConciseDb<T extends object> {
  private readonly filePath: string
  private _data: T
  public data: T
  constructor(filePath: string, data?: T) {
    this.filePath = filePath
    if (data !== undefined && typeof data !== 'object')
      throw new Error('data is not an object')
    const _con = this.getFileContentSync()
    if (_con === false) {
      // There is no file
      if (data === undefined)
        throw new Error('data is not defined')
      else
        this._data = data
      this.write(data)
    }
    else {
      // There is a JSON file
      this._data = _con
      if (data !== undefined)
        this.calcDiff(data)
    }
    this.data = deepProxy<T>(this._data, this.dataSet.bind(this))
  }

  /**
   * To get the content of the JSON file
   * @returns data or false
   */
  private getFileContentSync(): T | false {
    if (!fs.existsSync(this.filePath))
      return false
    const _con = JSON.parse(fs.readFileSync(this.filePath, { encoding: 'utf-8' }))
    if (typeof _con !== 'object')
      throw new Error('file content is not an object')
    return _con
  }

  /**
   * This function will run when the data update
   * @returns boolean
   */
  private dataSet(target: T, props: string | symbol, value: any, receiver: any): boolean {
    Reflect.set(target, props, value, receiver)
    this.write(this.data)
    return true
  }

  /**
   * To write data to the JSON file
   * @param data data to be written
   */
  private write(data: T) {
    fs.writeFileSync(this.filePath, JSON.stringify(data))
  }

  /**
   * To calculate the differences between the current data (saved in the JSON file) and the new data (user input)
   * @param data User input data
   */
  private calcDiff(data: T) {
    // Todo
    return data = JSON.parse(JSON.stringify(data))
  }

  /**
   * To get a copy of data
   * @returns a copy of data
   */
  public getData(): T {
    return JSON.parse(JSON.stringify(this._data))
  }
}
