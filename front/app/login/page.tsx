'use client'
import Input from '../components/Input'
import TextButton from '../components/TextButton'
import Button from '../components/Button'
import GoogleBtn from './components/googleBtn'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Swal from 'sweetalert2'

const Login = () => {
  const [userInput, setUserInput] = useState({
    email: '',
    pw: '',
  })

  const { email, pw } = userInput

  const handleInput = (e: any) => {
    const { name, value } = e.target
    setUserInput({ ...userInput, [name]: value })
  }
  const router = useRouter()

  const clickLogin = () => {
    !email || !pw
      ? Swal.fire({
          title: '로그인 실패',
          width: 300,
          text: '아이디 또는 비밀번호를 잘못 입력했습니다.',
          icon: 'error',
        })
      : console.log(userInput)
  }
  const forgetPw = () => {
    console.log('패스워드 까먹')
  }
  const googleLogin = () => {
    console.log('구글 로그인')
  }
  const clickRegist = () => {
    router.push('/regist')
  }

  return (
    <div className="flex flex-col h-screen bg-background-fill">
      <div className="px-5 my-auto">
        <div className="h-[355px] w-full px-5 py-5 bg-background rounded-lg">
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
          <Button color="primary" label="로그인" onClick={clickLogin}></Button>
          <div className="py-3">
            <GoogleBtn onClick={googleLogin}></GoogleBtn>
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
