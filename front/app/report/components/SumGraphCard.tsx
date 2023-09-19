'use client'
import { useState, useEffect } from 'react'

import ReportVerticalGraphBar from './ReportVerticalGraphBar'
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
  console.log(monthSumList.length)
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
  const [meanLenght, setMeanLength] = useState<string>('')

  useEffect(() => {
    // 계산에 필요한 변수 초기화
    let mean = 0
    const tmpLengthList: string[] = []

    for (let i = 0; i < amountList.length; i++) {
      const tmp = `${(Math.round(amountList[i]) / averageAmount()) * 100}px`
      mean += (Math.round(amountList[i]) / averageAmount()) * 100
      tmpLengthList.push(tmp)
    }

    // 상태 업데이트는 한 번만 수행
    setLengthList(tmpLengthList)
    setMeanLength('h-[' + Math.round(mean / amountList.length) + 'px]')

    // 디버깅용 콘솔 출력
    console.log(tmpLengthList)
    console.log(mean)
  }, []) // amountList가 변경될 때마다 실행
  return (
    // css가 아주 그냥 꼬였어
    <div className="h-fit flex w-full bg-background rounded-lg">
      <div className="flex flex-col w-full">
        <ReportTab
          handleCalendarTabChange={handleCalendarTabChange}
          activeCalendarTab={activeCalendarTab}
        />
        <div className="w-full flex relative">
          {/* <div className="flex z-1 bg-blue-100 m-5 p-5 rounded-lg overflow-auto "> */}
          <div className="flex w-full bg-blue-100 m-5 p-5 rounded-lg overflow-auto ">
            <div className="flex z-1">
              <div className="flex items-end justify-between">
                {amountList.map((amount, index) => (
                  <ReportVerticalGraphBar
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
                    // meanLenght={meanLenght}
                  />
                ))}
                <div
                  className={`w-full absolute border-t-4 border-red-500 ${meanLenght}`}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-5 mb-5 w-full">
          <div className=" bg-slate-100 rounded-lg w-full h-fit">
            평균지출금액
          </div>
        </div>
      </div>
    </div>
  )
}
export default SumGraphCard
