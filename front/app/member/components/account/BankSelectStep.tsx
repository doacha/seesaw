import { useState } from 'react'
import BankButton from './BankButton'
import { bankList, bankList2 } from '@/app/dummies'

interface Props {
  selectedBank: string
  onBankButtonClick: (value: string) => void
}

const BankSelectStep = (props: Props) => {
  return (
    <div>
      <h3 className="font-bold text-lg mb-5">등록할 은행을 선택하세요.</h3>
      <div className="flex">
        <div className="flex flex-col w-full gap-2 ml-2">
          {bankList.map((bank, index) => (
            <BankButton
              key={index}
              bankName={bank.bankName}
              bankImg={bank.bankImg}
              selectedBank={props.selectedBank}
              onBankButtonClick={props.onBankButtonClick}
            ></BankButton>
          ))}
        </div>
        <div className="flex flex-col w-full gap-2 ml-2">
          {bankList2.map((bank, index) => (
            <BankButton
              key={index}
              bankName={bank.bankName}
              bankImg={bank.bankImg}
              selectedBank={props.selectedBank}
              onBankButtonClick={props.onBankButtonClick}
            ></BankButton>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BankSelectStep
