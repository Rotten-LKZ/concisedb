
import { AdapterSync } from '../sync'

/**
 * Options for localStorageAdapterSync
 */
export interface LocalStorageAdapterSyncOptions {
  /**
   * Whether you need realtime update
   */
  realtimeUpdate?: boolean
  /**
   * The key will use when this adapter stores data
   */
  key: string
}

export default class localStorageAdapterSync<T extends object> extends AdapterSync<T, LocalStorageAdapterSyncOptions> {
  /**
   * Init the adapter
   * @param options Options for localStorageAdapterSync
   */
  constructor(options: LocalStorageAdapterSyncOptions) {
    super(options)
  }

  /**
   * To get data from localStorage
   * @returns data or false
   */
  public read(): false | string {
    if (!window.localStorage)
      return false
    const con = window.localStorage.getItem(this.adapterOptions.key)
    if (con === null)
      return false
    return con
  }

  /**
   * To write data to localStorage
   * @returns whether the write is successful
   */
  public write(data: T): boolean {
    if (!window.localStorage)
      return false
    window.localStorage.setItem(this.adapterOptions.key, JSON.stringify(data))
    return true
  }
}
