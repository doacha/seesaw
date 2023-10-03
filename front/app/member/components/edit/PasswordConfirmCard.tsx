'use client'
import Button from '@/app/components/Button'
import Input from '@/app/components/Input'
import { memberEmailStore } from '@/stores/memberEmail'
import { profileEditInfoStore } from '@/stores/profileEditInfo'
import React, { useState } from 'react'

interface Props {
  handleConfirmed: () => void
  handleModalClick: (e: React.MouseEvent) => void
}

const PasswordConfirmCard = (props: Props) => {
  const { memberEmail } = memberEmailStore()
  const [memberPassword, setMemberPassword] = useState<string>('')
  const [wrongPassword, setWrongPassword] = useState<boolean>(false)
  const {
    setProfileEditInfo,
    setInitBirthInfo,
  } = profileEditInfoStore()

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemberPassword(e.target.value)
  }

  const onConfirmButtonClick = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/member/confirm`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            memberEmail: memberEmail,
            memberPassword: memberPassword,
          }),
        },  
      )
      const memberInfo = await res.json()
      setProfileEditInfo('prevPassword', memberPassword)
      setProfileEditInfo('prevNickname', memberInfo.memberNickname)
      setProfileEditInfo('newNickname', memberInfo.memberNickname)
      setProfileEditInfo('memberName', memberInfo.memberName)
      setProfileEditInfo('memberGender', memberInfo.memberGender)
      setProfileEditInfo('newImg', {id:'profileImg', url: memberInfo.memberImgUrl})
      if (memberInfo.memberPhoneNumber) {
        setProfileEditInfo('phoneNumber', memberInfo.memberPhoneNumber)
      }
      setInitBirthInfo(memberInfo.memberBirth)
      props.handleConfirmed()
    } catch (err) {
      setWrongPassword(true)
    }
  }

  return (
    <div
      className="bg-white rounded-lg p-5 flex flex-col gap-5 mx-5 w-full max-w-[300px]"
      onClick={props.handleModalClick}
    > 
    <div className='flex flex-col gap-1'>
      <Input
        placeholder="비밀번호를 입력하세요."
        interval="10"
        type="password"
        onChange={onInputChange}
        value={memberPassword}
        label="비밀번호 확인"
        isLabelBig
      />
      {wrongPassword?<div className='text-error text-xs'>비밀번호가 틀렸습니다. 다시 입력해주세요.</div>:null}
      </div>
      <Button
        color="primary"
        label="확인"
        onClick={onConfirmButtonClick}
      ></Button>
    </div>
  )
}

export default PasswordConfirmCard
