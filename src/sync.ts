
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

/**
 * Adapter for synchronous storage
 */
export abstract class AdapterSync<T extends object, R> {
  public adapterOptions: R
  constructor(adapterOptions: R) {
    this.adapterOptions = adapterOptions
  }

  /**
   * Write data
   * @param data the data should be written
   * @returns whether the write is successful
   */
  public abstract write(data: T): boolean
  /**
   * Read data
   * @returns
   *  If you return string, ConciseDb will help you try parsing it to T.
   *  If you return false, it means there may be something wrong with the storage or non-exist.
   *  If you return T (typeof T is object), ConciseDb will use it as the data directly.
   */
  public abstract read(): T | false | string
}

export class ConciseDbSync<T extends object> {
  private readonly realtimeUpdate: boolean
  private readonly adapter: AdapterSync<T, any>
  private _data: T
  public data!: T

  /**
   * Init ConciseDbSync
   * @param adapter Adapter
   * @param defaultData Default data
   * @param realtimeUpdate Whether you need realtime update
   */
  constructor(adapter: AdapterSync<T, any>, defaultData?: T, realtimeUpdate = true) {
    this.realtimeUpdate = realtimeUpdate
    this.adapter = adapter
    if (defaultData !== undefined && typeof defaultData !== 'object')
      throw new Error('Init ConciseDb: data is not an object')
    const _con = this.parseData()
    if (_con === false) {
      // There is no file
      if (defaultData === undefined)
        throw new Error('Init ConciseDb: data is not defined')
      else
        this._data = defaultData
      this.adapter.write(this._data)
    }
    else {
      // There is a JSON file
      if (defaultData !== undefined) {
        // Notice: the data here will be changed when this._data change because of Object.assign
        // So I recommend not to use data
        this._data = this.calcDiff(defaultData, _con)
        this.adapter.write(this._data)
      }
      else {
        this._data = _con
      }
    }
    this.updateData()
  }

  /**
   * To parse the result of this.adapter.read() to T | false
   */
  private parseData(): T | false {
    const con = this.adapter.read()
    if (con === false)
      return false
    if (typeof con === 'string') {
      const con_sub = JSON.parse(con)
      if (typeof con_sub !== 'object')
        throw new Error('Adapter error: data is not an object')
      return con_sub
    }
    return con
  }

  /**
   * To calculate the differences between the current data (saved in the JSON file) and the new data (user input)
   * @param data User input data
   */
  private calcDiff(data: T, fileContent: T): T {
    return Object.assign(data, fileContent)
  }

  /**
   * Use Proxy to rebind the data
   * @param data data
   */
  private updateData(data?: T): void {
    this.data = deepProxy<T>(data === undefined ? this._data : data, this.dataSet.bind(this))
  }

  /**
   * This function will run when the data update
   * @returns boolean
   */
  private dataSet(target: T, props: string | symbol, value: any, receiver: any): boolean {
    Reflect.set(target, props, value, receiver)
    if (this.realtimeUpdate === true)
      this.adapter.write(this._data)
    return true
  }

  /**
   * Update the data from JSON file manually
   * @returns whether the update is successful
   */
  public read(): boolean {
    const con = this.parseData()
    if (con !== false) {
      this.updateData(con)
      return true
    }
    return false
  }

  /**
   * To update the JSON file manually
   * @returns whether the update is successful
   */
  public write(): boolean {
    return this.adapter.write(this._data)
  }

  /**
   * To get a copy of data
   * @returns a copy of data
   */
  public getData(): T {
    return JSON.parse(JSON.stringify(this._data))
  }
}
