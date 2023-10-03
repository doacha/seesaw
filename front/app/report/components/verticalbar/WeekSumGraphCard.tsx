'use client'

import { useState, useEffect } from 'react'
import ReportVerticalGraphBar from './ReportVerticalGraphBar'

interface WeekSumGraphCardProps {
  activeCalendarTab: string
  groupedSpending: Record<string, number>
}

const WeekSumGraphCard = ({
  activeCalendarTab,
  groupedSpending,
}: WeekSumGraphCardProps) => {
  let valuesArray: number[] = Object.values(groupedSpending)
  console.log(valuesArray)

  const averageAmount = () => {
    let sum = 0
    for (let i = 0; i < valuesArray.length; i++) {
      sum += valuesArray[i]
    }
    return sum / valuesArray.length
  }

  const [lengthList, setLengthList] = useState<string[]>([])

  useEffect(() => {
    let mean = 0
    const tmpLengthList: string[] = []
    if (valuesArray) {
      for (let i = 0; i < valuesArray.length; i++) {
        const tmp = `${(Math.round(valuesArray[i]) / averageAmount()) * 50}px`
        mean += (Math.round(valuesArray[i]) / averageAmount()) * 50
        tmpLengthList.push(tmp)
      }
    }
    setLengthList(tmpLengthList)
  }, [])

  return (
    <>
      <div className="w-full flex">
        <div className="flex relative w-full h-[300px] justify-between bg-blue-100 m-5 px-5 pt-10 pb-5 rounded-lg">
          <div
            className={`flex flex-col absolute items-start bottom-[80px] w-[calc(100%-40px)]`}
          >
            <div
              className={
                'flex text-[10px] min-w-max text-error  font-scDreamLight'
              }
            >
              평균
              {Math.round(averageAmount()).toLocaleString('ko-KR')}원
            </div>
            <div className="bg-error  rounded-full w-full h-[3px]"></div>
          </div>
          {valuesArray.map((amount, index) => (
            <div key={index} className="flex items-end justify-between">
              <ReportVerticalGraphBar
                amount={amount}
                length={lengthList[index]}
                round={index}
                bgColor={
                  index === valuesArray.length - 1
                    ? 'bg-primary'
                    : 'bg-blue-300'
                }
                txtColor={
                  index === valuesArray.length - 1
                    ? 'text-secondary'
                    : 'text-black'
                }
                key={index}
                amountListLength={valuesArray.length}
                activeCalendarTab={activeCalendarTab}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mx-5 mb-5 p-2 bg-slate-100 rounded-lg flex justify-between">
        <div className="flex flex-row">
          <div className=" bg-error mx-auto my-auto w-[15px] h-[5px] rounded-md"></div>
          <div className="ml-1 my-auto font-scDreamRegular text-xs">
            평균지출금액
          </div>
        </div>
        <div className="my-auto text-xs font-scDreamExBold">
          {Math.round(averageAmount()).toLocaleString('ko-KR')}원
        </div>
      </div>
    </>
  )
}

export default WeekSumGraphCard
