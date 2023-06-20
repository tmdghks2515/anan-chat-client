import {api} from "../api";

export const chatService = {
    send(params) {
        return api.post('/chat/send', params)
    }
}