import { api } from "../api";

export const userService = {
    login(params) {
        return api.post('/user/login', params)
    },
    logout(params) {
        return api.post('/user/logout')
    },
    list() {
        return api.get('/user/list')
    }
}