'use client'

import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import { useState } from 'react'

import Button from '../components/Button'

import TextButton from '../components/TextButton'
import Birth from './components/Birth'
import Email from './components/Email'
import Password from './components/Password'
import Nickname from './components/Nickname'
import Gender from './components/Gender'
import Name from './components/Name'

const Regist = () => {
  const [memberInput, setmemberInput] = useState({
    email: '',
    pw: '',
    pwCheck: '',
    name: '',
    nickname: '',
    gender: '',
    year: '',
    month: '',
    day: '',
  })

  const { email, pw, pwCheck, name, nickname, gender, year, month, day } =
    memberInput

  const handleInput = (e: any) => {
    const { name, value } = e.target
    setmemberInput({ ...memberInput, [name]: value })
  }

  const router = useRouter()

  // Todo - 이메일 인증하고 해당 인증 내용을 확인하는 boolean 변수 만들어야 함
  const checkEmail = () => {
    console.log('중복확인 클릭')
  }

  // Todo - 닉네임 중복 확인하고 해당 닉네밍 중복 확인 통과 했는지 확인하는 boolean 변수 만들어야 함
  const checkNick = () => {
    console.log('닉네임 중복확인')
  }

  const checkGender = (e: any) => {
    // back에 어떻게 요청을 보내느냐에 따라 값을 다르게 넣어야해
    setmemberInput({ ...memberInput, ['gender']: e.target.innerText })
  }

  const clickCancel = () => {
    router.back()
  }

  const signUp = () => {
    // Todo. 중복 인증이 되었는지도 함께 확인해야함
    const isAllValid = isEmailValid && isPwValid && isPwSame && isBirth
    const BirthStr = year + month + day
    const data: {
      memberEmail: string
      memberPassword: string
      memberName: string
      memberNickname: string
      memberBirth: string
      memberGender: boolean | undefined // boolean 또는 undefined
    } = {
      memberEmail: email,
      memberPassword: pw,
      memberName: name,
      memberNickname: nickname,
      memberBirth: BirthStr,
      memberGender: gender !== '' && gender === '여자' ? true : false,
    }
    !isAllValid
      ? Swal.fire({
          title: '회원가입 실패',
          width: 300,
          text: '입력칸을 모두 채워주세요!',
          icon: 'error',
        })
      : fetchRegist(data)
  }
  const clickLogin = () => {
    router.push('/login')
  }

  // 이메일 유효성 검사
  const isEmail = (email: string) => {
    const emailRegex = /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/
    return emailRegex.test(email)
  }
  const isEmailValid = isEmail(email)

  // 패스워드 유효성 검사
  const isPw = (pw: string) => {
    const pwRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return pwRegex.test(pw)
  }
  const isPwValid = isPw(pw)
  // 패스워드 재확인
  const isPwSame = pw === pwCheck
  // 생년월일 입력여부
  const isBirth = Boolean(year && month && day)

  const fetchRegist = (data: object) => {
    fetch(`${process.env.NEXT_PUBLIC_SEESAW_API_URL}/member/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // JSON 데이터를 전송할 경우 지정
      },
      body: JSON.stringify(data), // 데이터를 JSON 문자열로 변환하여 전송
    })
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            title: '회원가입 성공',
            width: 300,
            icon: 'success',
          })
          router.push('/login')
        }
        return res.json()
      })
      .catch((err) => Swal.showValidationMessage(`Request failed: ${err}`))
  }

  return (
    <div className="flex h-screen bg-background-fill">
      <div className="px-5 py-5 w-full">
        <div className="h-[730px] px-5 py-5 gb-base-100 rounded-lg bg-background">
          <p className="font-envR pb-3 justify-start text-2xl">회원가입</p>
          <form>
            {/* 이메일 입력 */}
            <Email
              onClick={checkEmail}
              onChange={handleInput}
              isVaild={isEmailValid}
              value={email}
            />

            {/* 비밀번호 입력 */}
            <Password
              onChange={handleInput}
              isVaild={isPwValid}
              pw={pw}
              pwCheck={pwCheck}
              isPwSame={isPwSame}
            />

            {/* 이름 입력 */}
            <Name value={name} onChange={handleInput} />

            {/* 닉네임 입력 */}
            <Nickname
              value={nickname}
              onChange={handleInput}
              onClick={checkNick}
            />

            {/* 생년월일 입력 */}
            <Birth onChange={handleInput} />

            {/* 성별 입력 */}
            <Gender onClick={checkGender} gender={gender} />

            {/* 가입하기 버튼 */}
            <div className="my-6">
              <div className="grid grid-flow-col gap-2">
                <Button
                  color="error"
                  label="취소"
                  size="sm"
                  onClick={clickCancel}
                />
                <Button
                  color="primary"
                  label="가입하기"
                  size="sm"
                  onClick={signUp}
                />
              </div>
            </div>
          </form>

          {/* 계정이 있다면? */}
          <div className="mt-14 flex items-center justify-center gap-8">
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
