'use client'
import {useEffect, useState} from "react"
import {useSelector} from "react-redux"
import {useRouter} from "next/navigation"
import {Data} from "@/core/data/message.data";

const Chat = () => {
  const [recipientUsername, setRecipientUsername] = useState('')
  const [content, setContent] = useState('')
  const [messages, setMessages] = useState<Data.Message[]>([])
  const [socket, setSocket] = useState<WebSocket | null>(new WebSocket('ws://localhost:8081/websocket'))
  const user = useSelector(state => state.user.value)
  const router = useRouter()

  useEffect(() => {


    if (!!socket) {
      // Event listeners and handling logic
      socket.onopen = () => {
        console.log('WebSocket connection established')
      }

      socket.onmessage = (event) => {
        const newMessage = JSON.parse(event.data)
        console.log('Received message:', newMessage)
        setMessages(prevArray => [...prevArray, newMessage])
      }

      socket.onclose = () => {
        console.log('WebSocket connection closed')
        // Handle the WebSocket connection closed event if needed
      }

      // Clean up the WebSocket connection on component unmount
      return () => {
        socket.close()
      }
    }
  }, [])

  const handleSend = () => {
    // Emit message to the WebSocket server
    if (!content.trim() || !socket)
      return

    if (!user) {
      alert('로그인후 이용해주세요.')
      router.push('/login')
      return
    }

    socket.send(JSON.stringify({
      content, recipientUsername
    }))

    setContent('')
  }

  return <div className='w-[30rem] flex flex-col gap-3'>
    <input
        value={recipientUsername}
        onChange={e => setRecipientUsername(e.target.value)}
        placeholder='수신인 id'
    />

    <div>
      { messages.map(message => <div key={message.id}>
        { message.sender.id === user.id ?
            <div className='text-right'>
              { `${message.content}` }
            </div> :
            <div>
              { `${message.sender.nickname}: ${message.content}` }
            </div>
        }
      </div>) }
    </div>

    <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder='내용'
    />
    <button onClick={handleSend}>
      전송
    </button>
  </div>
}

export default Chat