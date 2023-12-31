'use client'
import { useState } from 'react'

interface Props {
  password: string[]
  onPasswordChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => void
}
import { useRef } from 'react'
const PasswordInput = (props: Props) => {
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]
  const onInputFilled = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.target.value !== '' && index < inputRefs.length - 1) {
      inputRefs[index + 1]?.current?.focus()
    }
  }
  return (
    <div className="flex flex-col w-full gap-2">
      <label className="ml-2 text-xl font-scDreamExBold">비밀번호</label>
      <div className="flex w-full justify-between">
        {props.password.map((digit, index) => (
          <input
            key={index}
            type="password"
            value={digit}
            maxLength={1}
            ref={inputRefs[index]}
            onChange={(e) => {
              props.onPasswordChange(e, index)
              onInputFilled(e, index)
            }}
            className="input w-[64px]  bg-background-fill input-lg font-scDreamExBold focus:outline-primary focus:outline-[3px] "
          />
        ))}
      </div>
    </div>
  )
}

export default PasswordInput
