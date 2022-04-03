

// sync.ts

/**
 * Adapter for synchronous storage
 */
declare abstract class AdapterSync<T extends object, R> {
  public adapterOptions: R
  constructor(adapterOptions: R) 

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

declare class ConciseDbSync<T extends object> {
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
  constructor(adapter: AdapterSync<T, any>, defaultData?: T, realtimeUpdate = true)

  /**
   * To parse the result of this.adapter.read() to T | false
   */
  private parseData(): T | false

  /**
   * To calculate the differences between the current data (saved in the JSON file) and the new data (user input)
   * @param data User input data
   */
  private calcDiff(data: T, fileContent: T): T

  /**
   * Use Proxy to rebind the data
   * @param data data
   */
  private updateData(data?: T): void

  /**
   * This function will run when the data update
   * @returns boolean
   */
  private dataSet(target: T, props: string | symbol, value: any, receiver: any): boolean

  /**
   * Update the data from JSON file manually
   * @returns whether the update is successful
   */
  public read(): boolean

  /**
   * To update the JSON file manually
   * @returns whether the update is successful
   */
  public write(): boolean

  /**
   * To get a copy of data
   * @returns a copy of data
   */
  public getData(): T
}

// async.ts

/**
 * Adapter for asynchronous storage
 */
declare abstract class Adapter<T extends object, R> {
  public adapterOptions: R
  constructor(adapterOptions: R)

  /**
   * Write data
   * @param data the data should be written
   * @returns whether the write is successful
   */
  public abstract write(data: T): Promise<boolean>
  /**
   * Read data
   * @returns
   *  If you return string, ConciseDb will help you try parsing it to T.
   *  If you return false, it means there may be something wrong with the storage or non-exist.
   *  If you return T (typeof T is object), ConciseDb will use it as the data directly.
   */
  public abstract read(): Promise<T | false | string>
}

declare class ConciseDb<T extends object> {
  private realtimeUpdate!: boolean
  private adapter!: Adapter<T, any>
  private _data!: T
  public data!: T

  /**
   * Init the ConciseDb
   * @param adapter Adapter
   * @param defaultData Default data
   * @param realtimeUpdate Whether you need realtime update
   */
  public async init(adapter: Adapter<T, any>, defaultData?: T, realtimeUpdate = true)

  /**
   * To parse the result of this.adapter.read() to T | false
   */
  private async parseData(): Promise<T | false>

  /**
   * To calculate the differences between the current data (saved in the JSON file) and the new data (user input)
   * @param data User input data
   */
  private calcDiff(data: T, fileContent: T): T

  /**
   * Use Proxy to rebind the data
   * @param data data
   */
  private updateData(data?: T): void

  /**
   * This function will run when the data update
   * @returns boolean
   */
  private dataSet(target: T, props: string | symbol, value: any, receiver: any): boolean

  /**
   * Update the data from JSON file manually
   * @returns whether the update is successful
   */
  public read(): Promise<boolean>

  /**
   * To update the JSON file manually
   * @returns whether the update is successful
   */
  public write(): Promise<boolean>

  /**
   * To get a copy of data
   * @returns a copy of data
   */
  public getData(): T
}

// adapters/JSONAdapter.ts

/**
 * Options for JSONAdapterSyncOptions
 */
declare interface JSONAdapterOptions {
  /**
   * Where you require this adapter to store data
   */
  filePath: string
}

declare class JSONAdapter<T extends object> extends Adapter<T, JSONAdapterOptions> {
  /**
   * Init the adapter
   * @param options Options for JSONAdapter
   */
  constructor(options: JSONAdapterOptions)

  /**
   * To get the content of the JSON file
   * @returns data or false
   */
  public read(): Promise<false | T>

  /**
   * To update the JSON file
   */
  public write(data: T): Promise<boolean>
}

// adapters/JSONAdapterSync.ts

/**
 * Options for JSONAdapterSyncOptions
 */
declare interface JSONAdapterSyncOptions {
  /**
   * Where you require this adapter to store data
   */
  filePath: string
}

declare class JSONAdapterSync<T extends object> extends AdapterSync<T, JSONAdapterSyncOptions> {
  /**
   * Init the adapter
   * @param options Options for JSONSyncAdapter
   */
  constructor(options: JSONAdapterSyncOptions)

  /**
   * To get the content of the JSON file
   * @returns data or false
   */
  public read(): false | T

  /**
   * To update the JSON file
   */
  public write(data: T): boolean
}

export {
  ConciseDb,
  ConciseDbSync,
  Adapter,
  AdapterSync,
  JSONAdapterOptions,
  JSONAdapterSyncOptions,
  JSONAdapter,
  JSONAdapterSync,
}

export default {
  ConciseDb,
  ConciseDbSync,
  Adapter,
  AdapterSync,
  JSONAdapter,
  JSONAdapterSync,
}
