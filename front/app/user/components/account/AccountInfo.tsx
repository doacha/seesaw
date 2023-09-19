import { Account } from '@/app/types'

interface Props {
  account: Account
}

const AccountInfo = (props: Props) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2">
        <img
          className="mask w-[60px] h-[60px]"
          src={props.account.accountImg}
        />
        <div className="flex flex-col justify-center">
          <div className="text-outline text-base">
            {props.account.accountName}
          </div>
          <div className="text-sm text-outline-container">
            {props.account.accountNum}
          </div>
        </div>
      </div>
      <div className="text-lg font-scDreamExBold">
        {props.account.accountBalance.toLocaleString()}원
      </div>
    </div>
  )
}

export default AccountInfo
