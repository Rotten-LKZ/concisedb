
/**
 * The options type for classes
 */
declare interface Options {
  /** whether need to update the JSON file after changes */
  realtimeUpdate?: boolean
}

declare class ConciseDb<T extends object> {
  private readonly filePath: string
  private readonly options: Options
  private _data: T
  public data: T

  /**
   * Init this class
   * @param filePath the path of the JSON file
   * @param defaultData the default data of the JSON file
   * @param options Some options of this class
   */
  constructor(filePath: string, defaultData?: T, options?: Options)

  private getFileContent(): Promise<T | false>

  /**
   * To get the content of the JSON file
   * @returns data or false
   */
  private getFileContentSync(): T | false

  /**
   * This function will run when the data update
   * @returns boolean
   */
  private dataSet(target: T, props: string | symbol, value: any, receiver: any): boolean

  /**
   * To calculate the differences between the current data (saved in the JSON file) and the new data (user input)
   * @param data User input data
   */
  private calcDiff(data: T, fileContent: T): T

  /**
   * To get a copy of data
   * @returns a copy of data
   */
  public getData(): T

  /**
   * Update the data from JSON file manually
   * @returns whether the update is successful
   */
  public read(): Promise<boolean>

  /**
   * Update the data from JSON file manually
   * @returns whether the update is successful
   */
  public readSync(): boolean

  /**
   * To update the JSON file manually
   * @returns if this function return true, it means the data is updated successfully
   */
  public write(): Promise<boolean>

  /**
   * To update the JSON file manually
   */
  public writeSync(): void

  /**
   * To update the JSON file manually
   */
  public updateFile(): Promise<boolean>

  /**
   * To update the JSON file manually
   */
  public updateFileSync(): void
}

export default ConciseDb
export { Options }
