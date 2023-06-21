'use client'
import {useEffect, useState} from "react";
import {Data} from "@/core/data/user.data";
import {userService} from "@/core/api/services/user.service";

const NewChat = () => {
    const [users, setUsers] = useState<Data.User[]>([])
    const [participants, setParticipants] = useState<Data.User[]>([])

    useEffect(() => {
        userService.list()
            .then(res => { setUsers(res) })
            .catch(err => { console.log('error: ', err) })
    }, [])

    const handleAdd = (user: Data.User) => {
        if (!participants.some(v => v.id === user.id))
            setParticipants(prev => [...prev, user])
    }

    const handleRemove = (user: Data.User) => {
        setParticipants(prev => prev.filter(v => v.id !== user.id))
    }

    const handleCreate = () => {
        if (!participants || participants.length < 1) {
            alert('참가자를 선택해주세요')
            return
        }

    }

    return <div className='flex flex-col gap-3'>
        <h2>새 채팅</h2>

        <div>
            <span>채팅 참가자 목록: </span>
            <div className='flex gap-2'>
                { participants.map(participant => (
                    <span key={participant.id} onClick={() => handleRemove(participant)} className='underline cursor-pointer text-blue-500'>
                        { participant.nickname }
                    </span>)
                )}
            </div>
        </div>

        <div>
            <span>회원 목록: </span>
            <div className='flex gap-2'>
                { users.map(user => (
                    <span key={user.id} onClick={() => handleAdd(user)} className='underline cursor-pointer text-blue-500'>
                        { user.nickname }
                    </span>)
                )}
            </div>
        </div>

        <div>
            <button onClick={handleCreate}>
                채팅방 만들기
            </button>
        </div>
    </div>
}

export default NewChat