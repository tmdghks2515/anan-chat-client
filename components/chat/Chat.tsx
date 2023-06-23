'use client'
import {useEffect, useState} from "react"
import {useSelector} from "react-redux"
import {useRouter, useParams} from "next/navigation"
import {chatService} from "@/core/api/services/chat.service"

const Chat = () => {
  const [chat, setChat] = useState<Data.Chat | null>()
  const [socket, setSocket] = useState<WebSocket | null>()
  const [content, setContent] = useState('')
  const [messages, setMessages] = useState<Data.Message[]>([])
  const [targetLang, setTargetLang] = useState<'ko' | 'ja' | 'en' | ''>('')
  const user = useSelector(state => state.user.value)
  const router = useRouter()
  const { id } = useParams()

  useEffect(() => {
    if (!id)
      router.push('/login')

    // chat 조회
    fetchChat()
    // messages 조회
    // fetchMessages()
  }, [])

  useEffect(() => {
    if (!!socket) {
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
  }, [socket])

  useEffect(() => {
    fetchMessages()
  }, [targetLang])

  const handleSend = () => {
    // Emit message to the WebSocket server
    if (!content.trim() || !socket || !chat)
      return

    if (!user) {
      alert('로그인후 이용해주세요.')
      router.push('/login')
      return
    }

    socket.send(JSON.stringify({
      content,
      targetLang,
      chatId: chat.id
    }))

    setContent('')
  }

  const fetchChat = () => {
    chatService.readChat({ chatId: Number(id) })
        .then(data => {
          setChat(data)
          setSocket(new WebSocket(`ws://${process.env.NEXT_PUBLIC_API_HOST}/websocket/${id}`))
        })
        .catch(err => {
          console.log('err', err)
          if (err.showErrMsg)
            alert(err.message)
          else
            alert('오류가 발생하였습니다')
        })
  }

  const fetchMessages = () => {
    chatService.getMessages({
      chatId: Number(id),
      targetLang,
      size: 30,
      page: 0,
      sort: 'regTs,desc'
    }).then(data => {
      setMessages(data.list)
    }).catch(err => {
      if (err.showErrMsg)
        alert(err.message)
      else
        alert('오류가 발생하였습니다')
    })
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSend()
    }
  }

  const handleChangeLang = async (lang) => {
    setTargetLang(lang)
  }

  return <div className='w-[30rem] flex flex-col gap-3'>
    {/* 언어 설정 */}
    <div className='flex gap-3'>
      <span>언어 :</span>
      <select onChange={e => handleChangeLang(e.target.value)}>
        <option value=''>
          번역안함
        </option>
        <option value='ko'>
          한국어
        </option>
        <option value='ja'>
          일본어
        </option>
        <option value='en'>
          영어
        </option>
      </select>
    </div>

    <div>
      { user &&
        messages.map(message => <div key={message.id}>
        { message.sender.username === user.username ?
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
        onKeyDown={handleKeyDown}
        placeholder='내용'
    />
    <button onClick={handleSend}>
      전송
    </button>
  </div>
}

export default Chat