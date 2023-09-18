'use client'
import { useState, useEffect } from 'react'

import VerticalGraphBar from '@/app/components/VerticalGraphBar'
import ReportTab from './ReportTab'
import { Spending } from '@/app/types'
interface SumGraphCardProps {
  handleCalendarTabChange: (tab: string) => void
  activeCalendarTab: string
  monthSumList: Spending[]
}
const SumGraphCard = ({
  handleCalendarTabChange,
  activeCalendarTab,
  monthSumList,
}: SumGraphCardProps) => {
  // undefined는 어떻게 처리하는게 좋을까
  const amountList: number[] = monthSumList.map(
    (element) => element.spendingCostSum as number,
  )
  const averageAmount = () => {
    let sum = 0
    for (let i = 0; i < amountList.length; i++) {
      sum += amountList[i]
    }
    return sum / amountList.length
  }

  const [lengthList, setLengthList] = useState<string[]>([])
  useEffect(() => {
    for (let i = 0; i < amountList.length; i++) {
      let tmp = `${(Math.round(amountList[i]) / averageAmount()) * 100}px`
      setLengthList((prev) => [...prev, tmp])
    }
  }, [])
  return (
    <div className="flex p-5">
      <div className="h-[414px] flex w-full bg-background rounded-lg">
        <div className="w-full">
          <ReportTab
            handleCalendarTabChange={handleCalendarTabChange}
            activeCalendarTab={activeCalendarTab}
          />
          {/* <div className="w-full"> */}
          <div className="flex bg-blue-100 m-5 p-5 rounded-lg ">
            <div className="w-full">
              <div className="flex items-end justify-between">
                {amountList.map((amount, index) => (
                  <VerticalGraphBar
                    amount={amount}
                    length={lengthList[index]}
                    round={index}
                    bgColor={
                      index === amountList.length - 1
                        ? 'bg-primary'
                        : 'bg-blue-300'
                    }
                    txtColor={
                      index === amountList.length - 1
                        ? 'text-secondary'
                        : 'text-black'
                    }
                    key={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  )
}
export default SumGraphCard
