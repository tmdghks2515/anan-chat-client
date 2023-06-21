interface UserService {
  login: (params: {
    username: string,
    password: string
  }) => Promise<Data.User>

  logout: () => Promise<void>

  list: () => Promise<Data.User[]>
}

export const userService: UserService