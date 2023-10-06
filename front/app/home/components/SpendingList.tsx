'use client'

import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Card from '@/app/components/Card'
import { iconColors } from '@/app/lib/constants'
import { categoryIcon } from '@/app/lib/constants'
import { Spending } from '@/app/types'

import DetailModal from './DetailModal'
import EmptyAlert from './EmptyAlert'

interface SpendingListProps {
  sort: string
  formatTime: (date: Date) => string
  formatDayTime: (date: Date) => string
  newSelected?: Number[]
  spendingList: Spending[]
}

const SpendingList = ({
  sort,
  formatTime,
  formatDayTime,
  newSelected,
  spendingList,
}: SpendingListProps) => {
  // detail modal 열었는지 확인하는 open 변수
  const [open, setOpen] = useState<boolean>(false)
  const [selectedSpendingId, setSelectedSpendingId] = useState<number>(0)

  const handleToggle = (spendingId: number) => {
    setOpen((prevOpen) => !prevOpen)
    setSelectedSpendingId(spendingId)
  }
  const formatDay = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      weekday: 'long',
    }
    const formatter = new Intl.DateTimeFormat('ko-KR', options)
    return formatter.format(date)
  }

  // 단순 일자별 그룹화 -> 일자별 및 카테고리별 그룹화!
  const groupSpendingByDay = (
    spendingList: Spending[],
    newSelected?: Number[],
  ): Record<string, Spending[]> => {
    const groupedData: Record<string, Spending[]> = {}
    spendingList.forEach((spending: Spending) => {
      if (
        !newSelected ||
        newSelected.includes(0) ||
        newSelected.includes(spending.spendingCategoryId as number)
      ) {
        const day = formatDay(new Date(spending.spendingDate as string))
        if (!groupedData[day]) {
          groupedData[day] = []
        }
        groupedData[day].push(spending)
      }
    })

    return groupedData
  }

  // 'spendingList'를 일자별로 그룹화!
  const groupedSpending = groupSpendingByDay(spendingList, newSelected)

  // 데이터 없는걸 처리하기 위한 변수
  const [isEmpty, setIsEmpty] = useState<boolean>(false)

  useEffect(() => {
    // sort가 '최신순'인 경우
    if (sort === '최신순') {
      if (Object.entries(groupedSpending).length === 0) {
        setIsEmpty(true)
      } else {
        setIsEmpty(false)
      }
    }
    // sort가 '고액순'인 경우
    else {
      const hasData = spendingList.some(
        (element) =>
          newSelected?.includes(0) ||
          newSelected?.includes(element.spendingCategoryId as number),
      )
      setIsEmpty(!hasData)
    }
  }, [newSelected])

  return (
    <>
      {isEmpty ? (
        <EmptyAlert />
      ) : (
        <>
          {sort === '최신순' ? (
            <>
              {/* Object.entries가 그룹화된 데이터를 배열로 변환하는 과정 */}
              {Object.entries(groupedSpending).map(([day, data]) => (
                <div className="mb-3" key={day}>
                  <Card
                    title={day}
                    content={
                      // if works!
                      <>
                        {data.map((spending, key) => (
                          <div
                            key={spending.spendingId}
                            // 화살표 함수 쓴이유..? 안쓰면 어떻게 되는데? Todo. 화살표 함수 쓴 이유 정리하기
                            onClick={() =>
                              handleToggle(spending.spendingId as number)
                            }
                            className="h-9 flex w-full flex-row gap-5"
                          >
                            <div className="flex my-auto w-6 ml-1">
                              {spending.spendingCategoryId && (
                                <FontAwesomeIcon
                                  icon={
                                    categoryIcon[spending.spendingCategoryId]
                                  }
                                  style={{
                                    color:
                                      iconColors[spending.spendingCategoryId],
                                  }}
                                  size="xl"
                                />
                              )}
                            </div>
                            <div className="flex w-full justify-between">
                              <div className="flex flex-col">
                                <span className=" overflow-hidden font-scDreamRegular text-xs ">
                                  {spending.spendingTitle}
                                </span>
                                <span className="font-scDreamRegular text-xs text-outline">
                                  {spending.spendingDate &&
                                    formatTime(new Date(spending.spendingDate))}
                                </span>
                              </div>
                              <div>
                                <p className=" whitespace-nowrap font-scDreamExBold text-sm">
                                  {spending.spendingCost &&
                                    spending.spendingCost.toLocaleString(
                                      'ko-KR',
                                    )}
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
              <div className="px-5 pt-5 pb-2">
                {spendingList.map((spending, idx) => (
                  <div key={idx}>
                    {newSelected?.includes(0) ||
                    newSelected?.includes(
                      spending.spendingCategoryId as number,
                    ) ? (
                      <>
                        <div
                          key={idx}
                          onClick={() =>
                            handleToggle(spending.spendingId as number)
                          }
                          className="h-9 flex w-full flex-row gap-5 mb-3"
                        >
                          <div className="flex my-auto ml-1 w-6 ">
                            {spending.spendingCategoryId && (
                              <FontAwesomeIcon
                                icon={categoryIcon[spending.spendingCategoryId]}
                                style={{
                                  color:
                                    iconColors[spending.spendingCategoryId],
                                }}
                                size="xl"
                              />
                            )}
                          </div>
                          <div className="flex w-full justify-between">
                            <div className="flex flex-col">
                              <span className=" overflow-hidden font-scDreamRegular text-xs">
                                {spending.spendingTitle}
                              </span>
                              <span className="font-scDreamRegular text-xs text-outline">
                                {spending.spendingDate &&
                                  formatDayTime(
                                    new Date(spending.spendingDate),
                                  )}
                              </span>
                            </div>
                            <div>
                              <p className="whitespace-nowrap font-scDreamExBold text-xl">
                                {spending.spendingCost &&
                                  spending.spendingCost.toLocaleString('ko-KR')}
                                원
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : null}
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
      )}
    </>
  )
}

export default SpendingList
