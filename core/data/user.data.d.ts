import {Data} from "@/core/data/common.data";

export namespace Data {
  interface User {
    id: number,
    username: string,
    nickname: string,
    age: number,
    email: string,
    tellNo: string,
    profileSrc: string,
    gender: Data.Code,
    role: Data.Code,
    password: string
  }
}