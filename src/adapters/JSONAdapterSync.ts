import fs from 'fs'
import { AdapterSync } from '../sync'

/**
 * Options for JSONAdapterSyncOptions
 */
export interface JSONAdapterSyncOptions {
  /**
   * Where you require this adapter to store data
   */
  filePath: string
}

export default class JSONAdapterSync<T extends object> extends AdapterSync<T, JSONAdapterSyncOptions> {
  /**
   * Init the adapter
   * @param options Options for JSONSyncAdapter
   */
  constructor(options: JSONAdapterSyncOptions) {
    super(options)
  }

  /**
   * To get the content of the JSON file
   * @returns data or false
   */
  public read(): false | T {
    if (!fs.existsSync(this.adapterOptions.filePath))
      return false
    const _con = JSON.parse(fs.readFileSync(this.adapterOptions.filePath, { encoding: 'utf-8' }))
    if (typeof _con !== 'object')
      throw new Error('JSONSync Adapter: file content is not an object')
    return _con
  }

  /**
   * To update the JSON file
   */
  public write(data: T): boolean {
    fs.writeFileSync(this.adapterOptions.filePath, JSON.stringify(data))
    return true
  }
}
