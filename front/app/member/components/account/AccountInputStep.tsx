import Input from '@/app/components/Input'
import BankButton from './BankButton'
import { Bank } from '@/app/types'

interface Props {
  selectedBank: Bank
  accountNumber: string
  accountHolder: string
  accountChecked: number
  onAccountNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const AccountInputStep = (props: Props) => {
  return (
    <div>
      <h3 className="font-bold text-lg mb-5">계좌번호를 입력하세요.</h3>
      <BankButton
        bankImg={props.selectedBank.bankImg}
        bankName={props.selectedBank.bankName}
      />
      {props.accountChecked === 0 ? null : props.accountChecked === 1 ? (
        <div className="text-primary text-lg mb-1">
          예금주 : {props.accountHolder}
        </div>
      ) : (
        <div className="text-error mb-1">존재하지 않는 계좌입니다.</div>
      )}
      <div className="flex flex-col w-full gap-2">
        <input
          type="text"
          placeholder="계좌번호를 입력하세요"
          className="input bg-background-fill input-lg w-full focus:outline-primary focus:outline-[3px]"
          value={props.accountNumber}
          onChange={props.onAccountNumberChange}
        />
      </div>
    </div>
  )
}

export default AccountInputStep
