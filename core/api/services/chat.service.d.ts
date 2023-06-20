interface ChatService {
    send: (params: {
        content: string,
        recipientId: number
    }) => Promise<void>
}

export const chatService: ChatService