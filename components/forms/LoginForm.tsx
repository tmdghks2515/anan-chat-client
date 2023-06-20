"use client"
import {useState} from "react";
import {setUser} from "@/core/redux/slices/user.slice";
import {userService} from "@/core/api/services/user.service";
import {useDispatch} from "react-redux";
import {createAction} from "@reduxjs/toolkit/src/createAction";
import {Data} from "@/core/data/user.data";

export default function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const setUser = createAction('user/setUser', (user: Data.User) => {
    return { payload: user };
  });

  function handleLogin() {
    userService.login({username, password})
      .then(user => {
        dispatch(setUser(user))
      })
      .catch(err => {
        console.log('err!!!', err)
      })
  }

  return <div className='flex flex-col w-[30rem] mx-auto gap-2'>
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