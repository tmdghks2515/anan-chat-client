import { api } from "../api";

export const userService = {
    login(params) {
        return api.post('/user/login', params)
    }
}