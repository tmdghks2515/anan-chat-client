'use client'
import {useState} from "react";
import {useDispatch} from "react-redux";
import {userService} from "@/core/api/services/user.service";
import {setUser} from "@/store/slices/user.slice";

/*
    private int age;
    private String email;
    private String telNo;
    private String profileSrc;
    private CodeDto gender;
    private CodeDto role;
    private String password;
* */

export default function SingUpForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [nickname, setNickname] = useState('')

    return <div className='flex flex-col w-[30rem] mx-auto gap-2'>
        회원가입 page
    </div>
}