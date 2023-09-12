'use client'

import Button from '../components/Button'
import TextButton from '../components/TextButton'
import { useRouter } from 'next/navigation'
import Birth from './components/Birth'
import Email from './components/Email'
import Password from './components/Password'
import Nickname from './components/Nickname'
import Gender from './components/Gender'
import Name from './components/Name'
const Regist = () => {
  const router = useRouter()

  const checkEmail = () => {
    console.log('중복확인 클릭')
  }

  const checkNick = () => {
    console.log('닉네임 중복확인')
  }

  const handleInput = (e: any) => {
    console.log(e.target.value)
  }

  const checkGender = () => {
    console.log('gender 클릭')
  }

  const clickCancel = () => {
    router.back()
  }
  const signUp = () => {
    console.log('회원가입 완')
  }
  const clickLogin = () => {
    router.push('/login')
  }

  return (
    <div className="flex h-screen bg-background-fill">
      <div className="px-5 py-5">
        <div className="w-full h-[740px] px-5 py-5 gb-base-100 rounded-lg bg-background">
          <p className="font-envR pb-3 justify-start text-2xl">회원가입</p>
          {/* <form> */}
          <div>
            {/* 이메일 입력 */}
            <Email onClick={checkEmail} onChange={handleInput}></Email>

            {/* 비밀번호 입력 */}
            <Password onChange={handleInput}></Password>

            {/* 이름 입력 */}
            <Name onChange={handleInput}></Name>

            {/* 닉네임 입력 */}
            <Nickname onChange={handleInput} onClick={checkNick}></Nickname>

            {/* 생년월일 입력 */}
            <Birth onChange={handleInput}></Birth>

            {/* 성별 입력 */}
            <Gender onClick={checkGender}></Gender>

            {/* 가입하기 버튼 */}
            <div className="my-6">
              <div className="grid grid-flow-col gap-2">
                <Button
                  color="error"
                  label="취소"
                  size="sm"
                  onClick={clickCancel}
                ></Button>
                <Button
                  color="primary"
                  label="가입하기"
                  size="sm"
                  onClick={signUp}
                ></Button>
              </div>
            </div>
          </div>
          {/* </form> */}

          {/* 계정이 있다면? */}
          <div className="mt-10 mb-14 flex items-center justify-center gap-12">
            <p>계정이 있으신가요?</p>
            <TextButton
              innerText="로그인"
              textColor="text-primary"
              onButtonClick={clickLogin}
            ></TextButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Regist
