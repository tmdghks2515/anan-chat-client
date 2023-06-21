declare namespace Data {
  export interface Message {
    id: number,
    content: string,
    sender: Data.User,
    recipient: Data.User,
    regTs: string,
    modTs: string
  }

  export interface Chat {
    id: number,
    name: string,
    participants: Data.User[]
  }
}