import Input from '@/app/components/Input'
import BankButton from './BankButton'
import { useState } from 'react'

interface Props {
  selectedBank: string
  accountNumber: string
  onAccountNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const AccountInputStep = (props: Props) => {
  return (
    <div>
      <h3 className="font-bold text-lg mb-5">계좌번호를 입력하세요.</h3>
      <BankButton bankImg="./seesaw_logo.svg" bankName={props.selectedBank} />
      <div className="flex flex-col">
        <Input
          interval="5"
          placeholder="숫자만 입력하세요."
          type="number"
          value={props.accountNumber}
          onChange={props.onAccountNumberChange}
        ></Input>
      </div>
    </div>
  )
}

export default AccountInputStep
