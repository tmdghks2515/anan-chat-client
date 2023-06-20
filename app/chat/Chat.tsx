'use client'
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import {io} from "socket.io-client";

const Chat = () => {
  const [recipientId, setRecipientId] = useState(0)
  const [content, setContent] = useState('')
  const user = useSelector(state => state.user.value)
  const router = useRouter()
  let socket

  useEffect(() => {
    // Establish WebSocket connection
    socket = io('http://localhost:8081') // Replace with your Spring Boot backend URL

    // Event listeners and handling logic
    socket.on('connect', () => {
      alert('연결 되었습니다.')
    })

    socket.on('message', (message) => {
      console.log('Received message:', message);
      alert(`메시지 수신 .. ${message}`)
    })

    // Clean up the WebSocket connection on component unmount
    return () => {
      socket.disconnect()
    }
  }, [])

  const handleSend = () => {
    if (!user) {
      alert('로그인후 이용해주세요.')
      router.push('/login')
      return
    }
    // Function to send a message to the backend
    socket.emit('/chat/send', {
      content,
      recipientId
    }) // Emit a custom event 'send-message' with the message input as data
    setContent(''); // Clear the message input field
  }

  return <div className='w-[30rem] flex flex-col gap-3'>
    <input
        type='number'
        onChange={e => setRecipientId(Number(e.target.value))}
        placeholder='수신인 id'
    />
    <input
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