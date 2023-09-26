'use client'

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Card from '@/app/components/Card'
import { iconColors } from '@/app/lib/constants'
import { categoryIcon } from '@/app/lib/constants'
import { Spending } from '@/app/types'

import DetailModal from './DetailModal'

interface SpendingListProps {
  sort: string
  groupedSpending: Record<string, Spending[]>
  formatTime: (date: Date) => string
  spendingList: Spending[]
  formatDayTime: (date: Date) => string
  newSelected?: Number[]
}

const SpendingList = ({
  sort,
  groupedSpending,
  formatTime,
  spendingList,
  formatDayTime,
  newSelected,
}: SpendingListProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const [selectedSpendingId, setSelectedSpendingId] = useState<number>(0)
  const handleToggle = (spendingId: number) => {
    setOpen((prevOpen) => !prevOpen)
    setSelectedSpendingId(spendingId)
  }

  return (
    <>
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
                      // 화살표 함수 쓴이유..? 안쓰면 어떻게 되는데?
                      <div
                        key={spending.spendingId}
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
      <DetailModal
        open={open}
        handleToggle={() => handleToggle(selectedSpendingId)}
        selectedSpendingId={selectedSpendingId}
      />
    </>
  )
}

export default SpendingList
