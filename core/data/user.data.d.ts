declare namespace Data {
  export interface User {
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