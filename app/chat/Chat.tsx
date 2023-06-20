'use client'
import {useEffect, useState} from "react"
import {useSelector} from "react-redux"
import {useRouter} from "next/navigation"
import {Data} from "@/core/data/message.data";

const Chat = () => {
  const [recipientUsername, setRecipientUsername] = useState('')
  const [content, setContent] = useState('')
  // const [messages, setMessages] = useState<{ content: string, senderUsername: string, recipientUsername: '' }[]>([])
  const [messages, setMessages] = useState<Data.Message[]>([])
  const user = useSelector(state => state.user.value)
  const router = useRouter()

  useEffect(() => {
    // Establish WebSocket connection
    const socket = new WebSocket('ws://localhost:8080/websocket')

    // Event listeners and handling logic
    socket.onopen = () => {
      console.log('WebSocket connection established')
    }

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data)
      console.log('Received message:', message)
      setMessages([...messages, message])
    }

    socket.onclose = () => {
      console.log('WebSocket connection closed')
      // Handle the WebSocket connection closed event if needed
    }

    // Clean up the WebSocket connection on component unmount
    return () => {
      socket.close()
    }
  }, [])

  const handleSend = () => {
    // Emit message to the WebSocket server
    if (!content.trim())
      return

    if (!user) {
      alert('로그인후 이용해주세요.')
      router.push('/login')
      return
    }

    const socket = new WebSocket('ws://localhost:8080/websocket')
    socket.onopen = () => {
      socket.send(JSON.stringify({
        content, recipientUsername
      }))
    }

    setContent('')
  }

  return <div className='w-[30rem] flex flex-col gap-3 bg-yellow-400'>
    <div>
      { messages.map(message => <div key={message.id}>
        { `${message.sender.nickname}: ${message.content}` }
      </div>) }
    </div>

    <input
        value={recipientUsername}
        onChange={e => setRecipientUsername(e.target.value)}
        placeholder='수신인 id'
    />
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