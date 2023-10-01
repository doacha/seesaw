'use client'

import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import { useState, useEffect } from 'react'

import Input from '../components/Input'

import Button from '../components/Button'

import TextButton from '../components/TextButton'
import Birth from './components/Birth'
import Email from './components/Email'
import Password from './components/Password'
import Nickname from './components/Nickname'
import Gender from './components/Gender'
import Name from './components/Name'

const Regist = () => {
  console.log('너 무한으로 돌고있니?')
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
    if (name === 'email') {
      setCheckedEmail(0)
    }
    if (name === 'nickname') {
      setCheckedNickname(0)
    }
    setmemberInput({ ...memberInput, [name]: value })
  }

  const router = useRouter()

  // 0 => 이메일 input 눌렀는데 중복확인 안한상태 | 1 => 이메일 input 눌렀는데 중복확인 실패한 상태 | 2 => 이메일 input 누르고 중복확인 성공한 상태
  const [checkedEmail, setCheckedEmail] = useState<number>(0)

  // 이거 왜 계속 로드 중이야
  const fetchCheckEmail = () => {
    fetch(`${process.env.NEXT_PUBLIC_SEESAW_API_URL}/member/emailcheck`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: email,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data === true) {
          setCheckedEmail(2)
        } else {
          setCheckedEmail(1)
        }
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  // 0 => 닉네임 input 눌렀는데 중복확인 안한상태 | 1 => 닉네임 input 눌렀는데 중복확인 실패한 상태 | 2 => 닉네임 input 누르고 중복확인 성공한 상태
  const [checkedNickname, setCheckedNickname] = useState<number>(0)

  const fetchCheckNickname = () => {
    fetch(`${process.env.NEXT_PUBLIC_SEESAW_API_URL}/member/nicknamecheck`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // JSON 데이터를 전송할 경우 지정
      },
      body: nickname, // 데이터를  문자열로 변환하여 전송
    })
      .then((res) => {
        if (res.status === 200) {
          setCheckedNickname(2)
        } else if (res.status === 400) {
          setCheckedNickname(1)
        }
      })
      .then((data) => {})
  }

  const checkGender = (e: any) => {
    setmemberInput({ ...memberInput, ['gender']: e.target.innerText })
  }

  const clickCancel = () => {
    router.back()
  }

  const signUp = () => {
    const BirthStr = year + month + day
    const isAllValid =
      isEmailValid &&
      isPwValid &&
      isPwSame &&
      isBirth &&
      isGender &&
      checkedEmail === 2 &&
      checkedNickname === 2
    const data: {
      memberEmail: string
      memberPassword: string
      memberName: string
      memberNickname: string
      memberBirth: string
      memberGender: boolean
    } = {
      memberEmail: email,
      memberPassword: pw,
      memberName: name,
      memberNickname: nickname,
      memberBirth: BirthStr,
      memberGender: gender === '여자' ? true : false,
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

  // 여기는 로그인으로 이동하는 곳
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
  // 성별 입력여부
  const isGender = Boolean(gender)

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
      .then((data) => console.log(data))
  }

  useEffect(() => {
    // checkedEmail 상태가 변경될 때만 실행할 코드
    // 예: API 요청 및 상태 업데이트
  }, [checkedEmail])

  return (
    <div className="flex h-screen bg-background-fill">
      <div className="px-5 py-5 w-full">
        <div className="h-[750px] px-5 py-5 gb-base-100 rounded-lg bg-background">
          <p className="font-envR pb-3 justify-start text-2xl">회원가입</p>
          {/* form은 나빠요. */}
          <form method="POST" onSubmit={(e) => e.preventDefault()}>
            {/* 이메일 입력... 왜 계속 랜더링이 돌고 있는거야?ㄴ */}
            {/* 이메일 입력 */}
            {/* <Email
              checkedEmail={checkedEmail}
              onClick={fetchCheckEmail}
              onChange={handleInput}
              isVaild={isEmailValid}
              value={email}
            /> */}

            <p className="font-scDreamExBold text-xs justify-start">이메일</p>
            <div className="mt-2 mb-7 w-full">
              <div className="grid gap-3 grid-cols-3">
                <div className="col-span-2">
                  <Input
                    name="email"
                    onChange={handleInput}
                    type="id"
                    placeholder="이메일 입력"
                    interval="0"
                    value={email}
                  />
                  <div className="relative">
                    {!isEmailValid && email.length > 0 && checkedEmail == 0 && (
                      <p className="absolute top-0 left-0 mt-[2px] text-error text-xs">
                        * 이메일 양식을 맞춰주세요!
                      </p>
                    )}
                    {isEmailValid && email.length > 0 && checkedEmail === 1 && (
                      <p className="absolute top-0 left-0 mt-[2px] text-error text-xs">
                        * 이미 사용중인 이메일입니다!
                      </p>
                    )}
                    {isEmailValid && email.length > 0 && checkedEmail === 2 && (
                      <p className="absolute top-0 left-0 mt-[2px] text-green-500 text-xs">
                        * 사용가능한 이메일입니다!
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-span-1 my-auto">
                  <Button
                    color="primary"
                    label="중복확인"
                    size="xs"
                    onClick={fetchCheckEmail}
                  />
                </div>
              </div>
            </div>

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
              checkedNickname={checkedNickname}
              value={nickname}
              onChange={handleInput}
              onClick={fetchCheckNickname}
            />

            {/* 생년월일 입력 */}
            <Birth onChange={handleInput} birth={[year, month, day]} />

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
