import { Account, Transaction } from '@/app/types'
import AccountInfo from './AccountInfo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import TransactionInfo from './TransactionInfo'

const account: Account = {
  accountImg: './seesaw_logo.svg',
  accountBalance: 310000,
  accountName: '시소적금통장',
  accountNum: '123-45-6789',
  accountInactivate: false,
  accountInterestRate: 5,
  accountType: 1,
}

const transactionList: Transaction[] = [
  {
    accountApprovalAmount: 20000,
    accountNum: '987-65-4321',
    accountTransactionTime: '2023-09-18T13:55:00.111Z',
    amountBalance: 310000,
    accountTransactionName: '차차',
    accountIsDeposit: true,
  },
  {
    accountApprovalAmount: 20000,
    accountNum: '987-65-4321',
    accountTransactionTime: '2023-09-18T13:55:00.111Z',
    amountBalance: 310000,
    accountTransactionName: '차차',
    accountIsDeposit: false,
  },
  {
    accountApprovalAmount: 20000,
    accountNum: '987-65-4321',
    accountTransactionTime: '2023-09-18T13:55:00.111Z',
    amountBalance: 310000,
    accountTransactionName: '차차',
    accountIsDeposit: false,
  },
]

const formatDay = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    weekday: 'long',
  }
  const formatter = new Intl.DateTimeFormat('ko-KR', options)
  return formatter.format(date)
}
// 'spendingList'를 일자별로 그룹화하기 위한 함수
const groupTransactionByDay = (
  transactionList: Transaction[],
): Record<string, Transaction[]> => {
  const groupedData: Record<string, Transaction[]> = {}

  transactionList.forEach((transaction: Transaction) => {
    const day = formatDay(
      new Date(transaction.accountTransactionTime as string),
    )

    if (!groupedData[day]) {
      groupedData[day] = []
    }
    groupedData[day].push(transaction)
  })

  return groupedData
}

// 'spendingList'를 일자별로 그룹화합니다.
const groupedTransaction = groupTransactionByDay(transactionList)

{
  /* Object.entries가 그룹화된 데이터를 배열로 변환하는 과정 */
}

const AccountCard = () => {
  const [isOpened, setIsOpened] = useState<Boolean>(false)

  return (
    <div className="collapse bg-white rounded-lg">
      <input type="checkbox" onClick={() => setIsOpened(!isOpened)} />
      <div className="collapse-title text-xl font-medium p-5 pb-3 flex flex-col gap-2">
        <AccountInfo account={account} />
        <div className="w-full h-[1px] bg-outline-container" />
        <FontAwesomeIcon
          icon={faChevronDown}
          className={
            isOpened
              ? `text-outline-container justify-self-center rotate-180 transition-all`
              : `text-outline-container justify-self-center transition-all`
          }
        />
      </div>
      <div className="collapse-content p-x5">
        {Object.entries(groupedTransaction).map(([day, data]) => (
          <div>
            <div className="text-lg font-scDreamLight">{day}</div>
            <div className="h-[1px] bg-outline-container w-full mb-2" />
            <div className="flex flex-col gap-5">
              {data.map((transaction) => (
                <TransactionInfo transaction={transaction} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AccountCard
