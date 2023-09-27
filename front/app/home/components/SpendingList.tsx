'use client'

import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Card from '@/app/components/Card'
import { iconColors } from '@/app/lib/constants'
import { categoryIcon } from '@/app/lib/constants'
import { Spending } from '@/app/types'

import DetailModal from './DetailModal'

interface SpendingListProps {
  sort: string
  // addpostmodal을 열었니? 안열었니?를 확인하는 변수
  openBoolean: boolean
  formatTime: (date: Date) => string
  formatDayTime: (date: Date) => string
  newSelected?: Number[]
  spendData: Spending
  // 화살표 클릭 유무 확인하는 state인데.. 뭔가 이상한 것 같다...
  // Todo 날짜 처리가 이상하다
  clickEvent: boolean
}

const SpendingList = ({
  sort,
  openBoolean,
  formatTime,
  formatDayTime,
  newSelected,
  spendData,
  clickEvent,
}: SpendingListProps) => {
  console.log(newSelected)
  const [open, setOpen] = useState<boolean>(false)
  const [selectedSpendingId, setSelectedSpendingId] = useState<number>(0)
  const [spendingList, setSpendingList] = useState<Spending[]>([])

  const handleToggle = (spendingId: number) => {
    setOpen((prevOpen) => !prevOpen)
    setSelectedSpendingId(spendingId)
  }

  // const toDayYearMonth = new Date()
  // console.log(toDayYearMonth.getFullYear())
  // console.log(toDayYearMonth.getMonth() + 1)

  const data: {
    memberEmail: string
    spendingYear: number
    spendingMonth: number
    condition: 'spendingDate' | 'spendingCost'
  } = {
    // 변경이 필요함 email은 zustand에 있는 것
    memberEmail: 'doacha@seesaw.com',
    // spendingYear은 어케하징? 이거를 page에서 넘여줘야해
    spendingYear: 2023,
    // spendingMonth는 어케하징?
    spendingMonth: spendData.spendingMonth as number,
    condition: sort === '최신순' ? 'spendingDate' : 'spendingCost',
  }
  console.log(spendData)
  const fetchSpendingList = () => {
    fetch(`${process.env.NEXT_PUBLIC_SEESAW_API_URL}/spending/list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // JSON 데이터를 전송할 경우 지정
      },
      body: JSON.stringify(data), // 데이터를 JSON 문자열로 변환하여 전송
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setSpendingList(data)
      })
  }

  useEffect(() => {
    fetchSpendingList()
  }, [open, openBoolean, data.condition])

  const formatDay = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      weekday: 'long',
    }
    const formatter = new Intl.DateTimeFormat('ko-KR', options)
    return formatter.format(date)
  }
  // 'spendingList'를 일자별로 그룹화하기 위한 함수
  const groupSpendingByDay = (
    spendingList: Spending[],
  ): Record<string, Spending[]> => {
    const groupedData: Record<string, Spending[]> = {}
    spendingList.forEach((spending: Spending) => {
      const day = formatDay(new Date(spending.spendingDate as string))
      if (!groupedData[day]) {
        groupedData[day] = []
      }
      groupedData[day].push(spending)
    })

    return groupedData
  }

  // 'spendingList'를 일자별로 그룹화!
  const groupedSpending = groupSpendingByDay(spendingList)
  return (
    <>
      {/* 데이터가 없으면 데이터가 없습니다. 라는 표시가 나와야함 */}
      {/* 맞는 카테고리 매핑 */}
      {/* {newSelected?.map((element, idx) => ())} */}
      {sort === '최신순' ? (
        <>
          {/* Object.entries가 그룹화된 데이터를 배열로 변환하는 과정 */}
          {Object.entries(groupedSpending).map(([day, data]) => (
            <div className="mb-2" key={day}>
              <Card
                title={day}
                content={
                  // if works!
                  <>
                    {data.map((spending, key) => (
                      <div
                        key={spending.spendingId}
                        // 화살표 함수 쓴이유..? 안쓰면 어떻게 되는데?
                        onClick={() =>
                          handleToggle(spending.spendingId as number)
                        }
                        className="h-9 flex w-full flex-row gap-5"
                      >
                        <div className="flex my-auto w-6 ml-1">
                          {spending.spendingCategoryId && (
                            <FontAwesomeIcon
                              icon={categoryIcon[spending.spendingCategoryId]}
                              style={{
                                color: iconColors[spending.spendingCategoryId],
                              }}
                              size="xl"
                            />
                          )}
                        </div>
                        <div className="flex w-full justify-between">
                          <div className="flex flex-col">
                            <span className="font-scDreamRegular text-sm">
                              {spending.spendingTitle}
                            </span>
                            <span className="font-scDreamRegular text-xs text-outline">
                              {spending.spendingDate &&
                                formatTime(new Date(spending.spendingDate))}
                            </span>
                          </div>
                          <div>
                            <p className="font-scDreamExBold text-sm">
                              {spending.spendingCost &&
                                spending.spendingCost.toLocaleString('ko-KR')}
                              원
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                }
              />
            </div>
          ))}
        </>
      ) : (
        <div className="w-full h-fit rounded-lg bg-background">
          <div className="p-5">
            {spendingList.map((spending, idx) => (
              <div
                key={idx}
                onClick={() => handleToggle(spending.spendingId as number)}
                className="h-9 flex w-full flex-row gap-5 mb-3"
              >
                <div className="flex my-auto ml-1 w-6 ">
                  {spending.spendingCategoryId && (
                    <FontAwesomeIcon
                      icon={categoryIcon[spending.spendingCategoryId]}
                      style={{
                        color: iconColors[spending.spendingCategoryId],
                      }}
                      size="xl"
                    />
                  )}
                </div>
                <div className="flex w-full justify-between">
                  <div className="flex flex-col">
                    <span className="font-scDreamRegular text-sm">
                      {spending.spendingTitle}
                    </span>
                    <span className="font-scDreamRegular text-xs text-outline">
                      {spending.spendingDate &&
                        formatDayTime(new Date(spending.spendingDate))}
                    </span>
                  </div>
                  <div>
                    <p className="font-scDreamExBold text-xl">
                      {spending.spendingCost &&
                        spending.spendingCost.toLocaleString('ko-KR')}
                      원
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {open && (
        <DetailModal
          open={open}
          handleToggle={() => handleToggle(selectedSpendingId)}
          selectedSpendingId={selectedSpendingId}
        />
      )}
    </>
  )
}

export default SpendingList
