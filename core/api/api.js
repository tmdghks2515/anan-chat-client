import axios from "axios";
import {parse, stringify} from 'qs'
import {store} from "../../app/redux/store";
import {removeUser} from "../../app/redux/slices/user.slice";

const isClient = typeof window !== 'undefined'
const baseURL = isClient ?
    process.env.NEXT_PUBLIC_PROTOCOL + process.env.NEXT_PUBLIC_API_HOST :
    process.env.PROTOCOL + process.env.API_HOST

const instance = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
    paramsSerializer: {
        encode: parse,
        serialize: stringify,
    }
})

instance.interceptors.request.use(
    async (config) => {
        // help to set cookies when cors
        config.withCredentials = true
        return config
    }
)

const post = async (url, data = {}, config) => {
    return await instance.post(url, data, config)
        .then(res => res.data)
        .catch(err => errTransformer(err.response))
}

const get = (url, data = {}) => {
    return instance.get(url, {params: data})
        .then(res => res.data)
        .catch(err => errTransformer(err.response))
}

// const doCheckJwtHealth = async () => {
//     const { data } = await instance.request({
//         url: '/auth/jwt'
//     })
//     if (data === 'unsigned') {
//         return Promise.reject(new Error('unsigned'))
//     }
//     return Promise.resolve()
// }

const errTransformer = (res) => {
    if (!res) { return {} }
    if ([401, 403].includes(res.status)) {
        if (isClient) {
            redirectLogin()
        }
    }
    return Promise.reject(new ApiError(res))
}

export class ApiError {
    status = 0
    message = ''
    showErrMsg = false

    constructor(res) {
        this.status = res.status
        this.message = res.data.message
        this.showErrMsg = res.data.showErrMsg
    }
}

export function redirectLogin() {
    store.dispatch(removeUser())
    location.href = '/login'
}

export const api = {
    post, get
}

// export const apiWithJwtHealth = {
//     getWithJwt (url, data = {}) {
//         return this.checkJwtHealth(() => get(url, data))
//     },
//     postWithJwt (url, data = {}, config) {
//         return this.checkJwtHealth(() => post(url, data, config))
//     },
//     async checkJwtHealth (doApi) {
//         const state = await doCheckJwtHealth().then(() => true, () => false )
//         return state ? doApi() : redirectLogin()
//     }
// }
