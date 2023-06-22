import {useEffect, useState} from "react";
import {chatService} from "@/core/api/services/chat.service";
import {useRouter} from "next/navigation";
import {useSelector} from "react-redux";

const Chats = () => {
    const [chats, setChats] = useState<Data.Chat[] | null>([])
    const user = useSelector(state => state.user.value)
    const router = useRouter()

    useEffect(() => {
        chatService.getMyChats()
            .then(data => {
                setChats(data)
            })
    }, [])

    return <>
        { chats?.map(chat => (
            <div key={chat.id} onClick={() => { router.push(`/chat/${chat.id}`) }} className='text-blue-400 cursor-pointer'>
                { chat.participants.map(participant => (
                    participant.username !== user.username && <span key={participant.username}>{' ' + participant.nickname}</span>
                )) }
                님과의 대화
            </div>
        ))}
    </>
}

export default Chats