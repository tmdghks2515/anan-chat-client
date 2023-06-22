declare namespace Data {

  export interface Code {
    value: string,
    label: string
  }

  export interface ListRes<T> {
    list: T[],
    hasNext: boolean,
    totalCount: number
  }
}