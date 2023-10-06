import { Account } from '@/app/types'

interface Props {
  account: Account
  type?: string
}

const AccountInfo = (props: Props) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2">
        <img
          className={
            props.type === 'installment'
              ? 'mask w-[60px] h-[60px] rounded-md'
              : 'mask w-[60px] h-[60px]'
          }
          src={
            props.type === 'installment'
              ? 'https://seesawawsbucket.s3.ap-northeast-2.amazonaws.com/profile/%ED%9D%B0%EB%B0%B0%EA%B2%BD%EB%A1%9C%EA%B3%A0.png'
              : 'https://seesawawsbucket.s3.ap-northeast-2.amazonaws.com/profile/%EC%A0%95%EB%B0%A9%ED%98%95%EB%A1%9C%EA%B3%A0.png'
          }
        />
        <div className="flex flex-col justify-center">
          {props.type === 'main' ? (
            <div className="text-primary text-sm">대표</div>
          ) : null}
          <div
            className={
              props.type === 'installment'
                ? 'text-background text-base'
                : 'text-surface text-base'
            }
          >
            {props.account.accountName}
          </div>
          <div
            className={
              props.type === 'installment'
                ? 'text-outline-container text-base'
                : 'text-sm text-outline'
            }
          >
            {props.account.accountNum}
          </div>
        </div>
      </div>
      <div
        className={
          props.type === 'installment'
            ? 'text-background text-lg font-scDreamExBold'
            : 'text-lg font-scDreamExBold'
        }
      >
        {props.account.accountBalance.toLocaleString()}원
      </div>
    </div>
  )
}

export default AccountInfo
