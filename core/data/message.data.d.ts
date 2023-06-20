import {Data} from "@/core/data/user.data";

export namespace Data {
  interface Message {
    id: number,
    content: string,
    sender: Data.User,
    recipient: Data.User,
    regTs: string,
    modTs: string
  }
}