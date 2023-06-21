interface ChatService {
    sendMessage: (params: {
        content: string,
        chatId: number
    }) => Promise<void>

    getChat: (params: {
        participants: string[]
    }) => Promise<Data.Chat>
}

export const chatService: ChatService