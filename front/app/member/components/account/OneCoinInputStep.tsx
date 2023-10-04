import Input from '@/app/components/Input'
import OneCoinCodeInput from './OneCoinCodeInput'
import { useState } from 'react'

interface Props {
  authenticationCode: string[]
  onAuthenticationCodeChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => void
  wrongCode: boolean
}

const OneCoinInputStep = (props: Props) => {
  return (
    <div>
      <h3 className="font-bold text-lg mb-5">인증번호를 입력하세요.</h3>
      <div className="flex flex-col gap-2">
        <div>
          입력하신 계좌로 1원이 입금되었어요.
          <br />
          '시소뱅크' 뒤 번호 네자리를 입력해주세요.
        </div>
        <OneCoinCodeInput
          code={props.authenticationCode}
          onCodeChange={props.onAuthenticationCodeChange}
        />
        {props.wrongCode ? (
          <div className="text-xs text-error">
            인증번호가 일치하지 않습니다.
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default OneCoinInputStep
