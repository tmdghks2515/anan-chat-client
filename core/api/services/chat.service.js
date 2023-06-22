import {api} from "../api";

export const chatService = {
    sendMessage(params) {
        return api.post('/chat/send', params)
    },

    getChatId(params) {
        return api.post('/chat/getId', params)
    },

    readChat(params) {
        return api.get('/chat/read', params)
    },

    getMessages(params) {
        return api.get('/chat/messages', params)
    },

    getMyChats(params) {
        return api.get('/chat/myChats')
    }
}