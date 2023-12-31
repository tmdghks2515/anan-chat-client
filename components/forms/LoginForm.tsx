"use client"
import {useState} from "react";
import {userService} from "@/core/api/services/user.service";
import {useDispatch} from "react-redux";
import {setUser} from "@/app/redux/slices/user.slice";
import {useRouter} from "next/navigation";

export default function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const router = useRouter()

  function handleLogin() {
    userService.login({username, password})
      .then(user => {
        dispatch(setUser(user))
        router.push('/')
      })
  }

  return <div className='flex flex-col w-[100%] p-2 md:w-[30rem] mx-auto gap-2'>
    <input
      name='username'
      onChange={e => setUsername(e.target.value)}
    />
    <input
      name='password'
      type='password'
      onChange={e => setPassword(e.target.value)}
    />
    <button onClick={handleLogin}>
      로그인
    </button>
  </div>
}