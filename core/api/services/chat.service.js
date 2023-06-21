import {api} from "../api";

export const chatService = {
    sendMessage(params) {
        return api.post('/chat/send', params)
    },

    getChat(params) {
        return api.post('/chat/get', params)
    }
}