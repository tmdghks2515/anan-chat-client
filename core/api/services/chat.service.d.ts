interface ChatService {
    sendMessage: (params: {
        content: string,
        chatId: number
    }) => Promise<void>

    getChat: (params: {
        participantIds: number[]
    }) => Promise<Data.Chat>
}

export const chatService: ChatService