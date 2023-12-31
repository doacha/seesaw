'use client'
import { Account, Transaction } from '@/app/types'
import AccountInfo from './AccountInfo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'
import TransactionInfo from './TransactionInfo'
import { account, transactionList } from '@/app/dummies'
import TransactionLoading from './TransactionLoading'
import EndAlert from './EndAlert'

interface Props {
  account: Account
  bgColor?: 'installment' | 'main'
}

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

{
  /* Object.entries가 그룹화된 데이터를 배열로 변환하는 과정 */
}

const AccountCard = (props: Props) => {
  const [isOpened, setIsOpened] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [nothingToLoad, setNothingToLoad] = useState<boolean>(false)
  const [opentAccountNum, setOpenedAccountNum] = useState<string>('')
  const [accountTranscationList, setAccountTransactionList] = useState<
    Transaction[]
  >([])
  const [page, setPage] = useState<number>(0)

  const getAccountDetailInfo = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SEESAW_BANK_API_URL}/account/accountdetail`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            accountNum: props.account.accountNum,
            pageNum: page,
          }),
        },
      )

      const newestData: Transaction[] = await res.json()
      setAccountTransactionList(newestData)
      if (newestData.length === 0) {
        setNothingToLoad(true)
        setIsLoading(false)
      }
      setIsLoading(true)
    } catch (err) {
      console.log(err)
    }
  }

  const getMoreAccountDetailInfo = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SEESAW_BANK_API_URL}/account/accountdetail`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            accountNum: props.account.accountNum,
            pageNum: page,
          }),
        },
      )
      const newestData: Transaction[] = await res.json()
      if (newestData.length === 0) {
        setNothingToLoad(true)
        setIsLoading(false)
      }
      setAccountTransactionList((prev) => prev.concat(newestData))
      setIsLoading(true)
    } catch (err) {
      console.log(err)
    }
  }

  const detailButtonClick = () => {
    setPage(0)
    setOpenedAccountNum('')
    setNothingToLoad(false)
    if (!isOpened) {
      getAccountDetailInfo()
      setOpenedAccountNum(props.account.accountNum)
    }
    setIsOpened(!isOpened)
  }

  const groupedTransaction = groupTransactionByDay(accountTranscationList)

  useEffect(() => {
    if (isLoading) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            loadMore()
          }
        },
        { threshold: 1 },
      )
      //옵져버 탐색 시작
      if (target.current) observer.observe(target.current)
    }
  }, [isLoading])

  useEffect(() => {
    getMoreAccountDetailInfo()
  }, [page])

  const loadMore = () => {
    setPage((prev) => prev + 1)
  }

  const target = useRef<HTMLDivElement>(null)

  return (
    <div
      className={
        isOpened && opentAccountNum === props.account.accountNum
          ? 'collapse absolute top-[105px] left-0 w-full h-[calc(100vh-168px)] z-50 transition-all rounded-none bg-background'
          : 'collapse bg-background rounded-lg'
      }
    >
      <input type="checkbox" onClick={() => detailButtonClick()} />
      <div
        className={
          props.bgColor === 'installment'
            ? 'collapse-title text-xl font-medium p-5 pb-3 flex flex-col gap-2 bg-primary'
            : 'collapse-title text-xl font-medium p-5 pb-3 flex flex-col gap-2'
        }
      >
        <AccountInfo account={props.account} type={props.bgColor} />
        <div
          className={
            isOpened
              ? 'w-full h-[1px] bg-transparent transition-all'
              : 'w-full h-[1px] bg-outline-container transition-all'
          }
        />

        <FontAwesomeIcon
          icon={faChevronDown}
          className={
            isOpened
              ? `text-outline-container justify-self-center rotate-180 transition-all`
              : `text-outline-container justify-self-center transition-all`
          }
        />
      </div>
      <div className="collapse-content px-5 bg-background rounded-b-lg overflow-scroll">
        {Object.entries(groupedTransaction).map(([day, data]) => (
          <div key={day} className="h-max">
            <div className="text-lg font-scDreamLight mt-5">{day}</div>
            <div className="h-[1px] bg-outline-container w-full mb-2" />
            <div className="flex flex-col gap-5">
              {data.map((transaction, index) => (
                <TransactionInfo transaction={transaction} key={index} />
              ))}
            </div>
          </div>
        ))}
        {nothingToLoad ? <EndAlert /> : <TransactionLoading target={target} />}
      </div>
    </div>
  )
}

export default AccountCard
