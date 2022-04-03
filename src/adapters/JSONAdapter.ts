import fs from 'fs'
import { Adapter } from '..'

/**
 * Options for JSONAdapterSyncOptions
 */
export interface JSONAdapterOptions {
  /**
   * Where you require this adapter to store data
   */
  filePath: string
}

export default class JSONAdapter<T extends object> extends Adapter<T, JSONAdapterOptions> {
  /**
   * Init the adapter
   * @param options Options for JSONAdapter
   */
  constructor(options: JSONAdapterOptions) {
    super(options)
  }

  /**
   * To get the content of the JSON file
   * @returns data or false
   */
  public read(): Promise<false | T> {
    const filePath = this.adapterOptions.filePath
    return new Promise((resolve, reject) => {
      if (!fs.existsSync(filePath))
        return resolve(false)
      fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
        if (err) {
          reject(err)
        }
        else {
          const _con = JSON.parse(data)
          if (typeof _con !== 'object')
            reject(new Error('JSONSync Adapter: file content is not an object'))
          else
            resolve(_con)
        }
      })
    })
  }

  /**
   * To update the JSON file
   */
  public write(data: T): Promise<boolean> {
    const filePath = this.adapterOptions.filePath
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, JSON.stringify(data), (err) => {
        if (err)
          reject(err)
        else
          resolve(true)
      })
    })
  }
}
