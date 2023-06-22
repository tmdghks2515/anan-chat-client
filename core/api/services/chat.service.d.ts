interface ChatService {
    sendMessage: (params: {
        content: string,
        chatId: number
    }) => Promise<void>

    getChat: (params: {
        participants: string[]
    }) => Promise<Data.Chat>

    readChat: (params: {
        chatId: number
    }) => Promise<Data.Chat>

    getMessages: (params: {
        chatId: number,
        page: number,
        size: number,
        sort: string
    }) => Promise<Data.ListRes<Data.Message>>

    getMyChats: () => Promise<Data.Chat[]>
}

export const chatService: ChatService