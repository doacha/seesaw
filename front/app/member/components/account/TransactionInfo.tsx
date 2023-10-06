import { Transaction } from '@/app/types'
import { faUtensils } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
  transaction: Transaction
}

const TransactionInfo = (props: Props) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        {/* <FontAwesomeIcon
          icon={faUtensils}
          size="xl"
          className="text-category-1"
        /> */}
        <div className="flex flex-col justify-center">
          <div className="text-base font-scDreamMedium">
            {props.transaction.accountTransactionName}
          </div>
          <div className="text-sm text-outline">
            {props.transaction.accountTransactionTime.split('T')[0]}
          </div>
        </div>
      </div>
      <div className="text-right">
        <div
          className={
            props.transaction.accountApprovalAmount > 0
              ? 'text-lg font-scDreamExBold text-primary'
              : 'text-lg font-scDreamExBold text-error'
          }
        >
          {/* {props.transaction.accountIsDeposit ? '' : '-'} */}
          {props.transaction.accountApprovalAmount.toLocaleString()}원
        </div>
        <div className="text-base text-outline">
          {props.transaction.accountBalance.toLocaleString()}원
        </div>
      </div>
    </div>
  )
}

export default TransactionInfo
