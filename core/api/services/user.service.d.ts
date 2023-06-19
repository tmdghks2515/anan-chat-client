import {Data} from "@/core/data/user.data";

interface UserService {
  login: (params: {
    username: string,
    password: string
  }) => Promise<Data.User>
}

export const userService: UserService