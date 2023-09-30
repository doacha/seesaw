'use client'
import Input from '@/app/components/Input'
import PasswordInput from './PasswordInput'
import { useState } from 'react'

interface Props {
  accountName: string
  password: string[]
  onAccountNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onPasswordChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => void
}

const InstallmentCreateStep = (props: Props) => {
  return (
    <div className="w-full h-[700px] p-5 flex flex-col items-center justify-center gap-5">
      <div className="flex flex-col w-full gap-2">
        <label className="ml-2 text-xl font-scDreamExBold">계좌명</label>
        <input
          type="text"
          placeholder="사용할 계좌명을 적어주세요."
          className="input bg-background-fill input-lg w-full focus:outline-primary focus:outline-[3px]"
          value={props.accountName}
          onChange={props.onAccountNameChange}
        />
      </div>
      <div className="flex w-full gap-2">
        <PasswordInput
          password={props.password}
          onPasswordChange={props.onPasswordChange}
        />
      </div>
    </div>
  )
}

export default InstallmentCreateStep
