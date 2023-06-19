import axios from "axios";
import {parse, stringify} from 'qs'
// import store from "../redux/store";
// import {removeUser} from "../redux/slices/user.slice";

const isClient = typeof window !== 'undefined'
// const baseURL = isClient ? process.env.REACT_APP_PROTOCOL + process.env.REACT_APP_API_HOST : ''
const baseURL = 'http://localhost:8080/api'

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
    if (res.status === 400 || res.status === 500 ) {
        return Promise.reject(new ApiError(res))
    } else if (res.status === 401) {
        if (isClient) {
            redirectLogin()
        }
    } else if (res.status === 403) {
        if (isClient) {
            redirectLogin()
        }
    }
    return res
}

export class ApiError {
    result = 0
    resultMsg = ''

    constructor({ status, data: {message} }) {
        this.result = status
        this.resultMsg = message
    }

    get isShowErrorMessage () {
        return this.result === 400
    }
}

export function redirectLogin() {
    // store.dispatch(removeUser())
    location.href = '/signIn'
    return Promise.resolve({item: {}, items: []})
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
