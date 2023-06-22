interface ChatService {
    sendMessage: (params: {
        content: string,
        chatId: number
    }) => Promise<void>

    getChatId: (params: {
        participants: string[]
    }) => Promise<number>

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