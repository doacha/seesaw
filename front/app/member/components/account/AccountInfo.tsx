import { Account } from '@/app/types'

interface Props {
  account: Account
  type? : string
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
          {props.type ==='main'? <div className='text-primary text-sm'>대표</div>: null}
          <div className={props.type ==='installment'? "text-background text-base":"text-surface text-base"}>
            {props.account.accountName}
          </div>
          <div className={props.type ==='installment'? "text-outline-container text-base":"text-sm text-outline"}>
            {props.account.accountNum}
          </div>
        </div>
      </div>
      <div className={props.type ==='installment'? "text-background text-lg font-scDreamExBold":"text-lg font-scDreamExBold"}>
        {props.account.accountBalance.toLocaleString()}원
      </div>
    </div>
  )
}

export default AccountInfo
