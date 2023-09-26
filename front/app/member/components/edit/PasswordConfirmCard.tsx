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
  const {
    birth,
    phoneNumber,
    newNickname,
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
      console.log(memberInfo)
      setProfileEditInfo('newNickname', memberInfo.memberNickname)
      setProfileEditInfo('phoneNumber', memberInfo.memberPhoneNumber)
      setInitBirthInfo(memberInfo.memberBirth)
      props.handleConfirmed()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div
      className="bg-white rounded-lg p-5 flex flex-col gap-5"
      onClick={props.handleModalClick}
    >
      <Input
        placeholder="비밀번호를 입력하세요."
        interval="10"
        type="password"
        onChange={onInputChange}
        value={memberPassword}
        label="비밀번호 확인"
        isLabelBig
      />
      <Button
        color="primary"
        label="확인"
        onClick={onConfirmButtonClick}
      ></Button>
    </div>
  )
}

export default PasswordConfirmCard
