'use client'
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {removeUser} from "@/app/redux/slices/user.slice";
import {useEffect, useState} from "react";
import {userService} from "@/core/api/services/user.service";

const MainNav = () => {
    const user = useSelector(state => state.user.value)
    const [userState, setUserState] = useState<Data.User | null>()
    const dispatch = useDispatch()

    const handleLogout = () => {
        userService.logout()
            .then(() => {
                alert('로그아웃 됨')
                dispatch(removeUser())
            })
            .catch(err => { console.log('err: ', err) })
    }

    useEffect(() => {
        setUserState(user)
    }, [user])

    return <div className='flex gap-3'>
        <span>메인 페이지</span>

        { userState ?
            <>
                <span>{ `${userState.nickname}님 반가워요` }</span>
                <span className='underline cursor-pointer' onClick={handleLogout}>
                    로그아웃
                </span>
            </> :
            <Link href={'/login'}>
                로그인
            </Link>
        }

        <Link href={'/chat/new'} className='underline cursor-pointer text-blue-500'>
            새 채팅
        </Link>
    </div>
}

export default MainNav