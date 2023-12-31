'use client'
import { redirect, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

import Input from '../components/Input'
import TextButton from '../components/TextButton'
import Button from '../components/Button'
import Image from 'next/image'
import Logo from '@/public/seesaw_logo.svg'

import { memberEmailStore } from '@/stores/memberEmail'
import { currentTabStore } from '@/stores/currentTab'

interface Member {
  memberEmail: string
  memberNickname: string
}

const Login = () => {
  const [memberInput, setmemberInput] = useState({
    email: '',
    pw: '',
  })

  const { email, pw } = memberInput
  const { memberEmail, setMember } = memberEmailStore()
  const { setCurrentTab } = currentTabStore()
  const handleInput = (e: any) => {
    const { name, value } = e.target
    setmemberInput({ ...memberInput, [name]: value })
  }
  const router = useRouter()

  const handleKeyUp = (e: any) => {
    if (e.key === 'Enter') {
      clickLogin()
    }
  }

  const clickLogin = () => {
    const data: {
      memberEmail: string
      memberPassword: string
    } = {
      memberEmail: email,
      memberPassword: pw,
    }
    !email || !pw
      ? Swal.fire({
          title: '로그인 실패',
          width: 300,
          html: '아이디 또는 <br> 비밀번호를 입력해주세요.',
          icon: 'error',
        })
      : // 이메일 입력창과 패스워드 입력창이 채워졌다면 fetch 수행
        fetchLogin(data)
  }

  const fetchLogin = (data: object) => {
    fetch(`${process.env.NEXT_PUBLIC_SEESAW_API_URL}/member/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 200) {
          setCurrentTab('home')
          router.push('/home')
        } else if (res.status === 400) {
          Swal.fire({
            title: '로그인 실패',
            width: 300,
            html: '아이디 혹은 <br> 비밀번호를 확인하세요',
            icon: 'error',
          })
        } else if (res.status === 401) {
          Swal.fire({
            title: '로그인 실패',
            width: 300,
            html: '이메일 인증을 완료해주세요!',
            icon: 'error',
          })
        }
        return res.json()
      })
      .then((data) => {
        setMember(data.memberEmail, data.memberNickname)
      })
      .catch((err) => Swal.showValidationMessage(`Request failed: ${err}`))
  }
  const forgetPw = () => {
    // console.log('패스워드 까먹')
  }

  const clickRegist = () => {
    router.push('/regist')
  }

  useEffect(() => {
    if (memberEmail !== '') {
      redirect('./home')
    }
  }, [])

  return (
    <div className="flex flex-col h-screen bg-background-fill">
      <div className="px-5 my-auto">
        <div className="flex flex-col">
          <div className="flex justify-center mb-10">
            <Image src={Logo} alt="seesaw_logo" width={140} height={100} />
          </div>
          <div className="h-[300px] w-full px-5 py-5 bg-background rounded-lg">
            <p className="font-envR justify-start text-2xl">로그인</p>

            <div className="py-3 w-full">
              <Input
                name="email"
                onChange={handleInput}
                type="email"
                placeholder="이메일"
                interval="0"
              />
            </div>
            <Input
              name="pw"
              onChange={handleInput}
              onKeyUp={handleKeyUp}
              type="password"
              placeholder="비밀번호"
              interval="0"
            ></Input>
            <div className="flex py-5 pr-5 justify-end text-xs">
              <TextButton
                innerText="비밀번호를 잊으셨나요?"
                textColor=" text-blue-600"
                onButtonClick={forgetPw}
              ></TextButton>
            </div>
            <div className="mt-4">
              <Button color="primary" label="로그인" onClick={clickLogin} />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 mb-14 flex justify-center items-center gap-8">
        <p>계정이 없으신가요?</p>
        <TextButton
          innerText="회원가입"
          textColor="text-primary"
          onButtonClick={clickRegist}
        ></TextButton>
      </div>
    </div>
  )
}

export default Login
