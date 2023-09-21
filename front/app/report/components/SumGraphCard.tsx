'use client'
import { useState, useEffect } from 'react'

import ReportVerticalGraphBar from './ReportVerticalGraphBar'
import ReportTab from './ReportTab'
import { Spending } from '@/app/types'
import MonthSumGraphCard from './MonthSumGraphCard'

interface SumGraphCardProps {
  handleCalendarTabChange: (tab: string) => void
  activeCalendarTab: string
  sumList: Spending[]
  groupedSpending: Record<string, number>
}
const SumGraphCard = ({
  handleCalendarTabChange,
  activeCalendarTab,
  sumList,
  groupedSpending,
}: SumGraphCardProps) => {
  let amountList: number[] = sumList.map(
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
    // 평균 지출 금액을 파악하기 위한 빨간 줄.. 슬프게도 미완..
    let mean = 0
    const tmpLengthList: string[] = []

    for (let i = 0; i < amountList.length; i++) {
      const tmp = `${(Math.round(amountList[i]) / averageAmount()) * 60}px`
      mean += (Math.round(amountList[i]) / averageAmount()) * 60
      tmpLengthList.push(tmp)
    }

    setLengthList(tmpLengthList)
    setMeanLength('h-[' + Math.round(mean / amountList.length) + 'px]')

    console.log(tmpLengthList)
    console.log(mean)
    console.log(meanLenght)
  }, [])

  return (
    // css가 아주 그냥 꼬였어
    <div className="h-fit relative w-full bg-background rounded-lg">
      <div
        className={`absolute left-0 right-0 mx-auto w-[78%] h-[5px] bg-error ${meanLenght} rounded-full`}
      ></div>
      <div className="flex flex-col w-full">
        <ReportTab
          handleCalendarTabChange={handleCalendarTabChange}
          activeCalendarTab={activeCalendarTab}
        />
        {activeCalendarTab == 'tab1' ? (
          <>
            <div className="w-full flex">
              <div className="flex w-full justify-between bg-blue-100 m-5 px-5 pt-10 pb-5 rounded-lg overflow-auto">
                {amountList.map((amount, index) => (
                  <>
                    <div className="flex items-end justify-between">
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
                        amountListLength={amountList.length}
                        activeCalendarTab={activeCalendarTab}

                        // meanLenght={meanLenght}
                      />
                    </div>
                  </>
                ))}
              </div>
            </div>
            <div className="mx-5 mb-5 p-2 bg-slate-100 rounded-lg  flex justify-between">
              <div className="ml-1 my-auto font-scDreamRegular text-xs">
                평균지출금액
              </div>
              <div className="my-auto text-xs font-scDreamExBold">
                {Math.round(averageAmount()).toLocaleString('ko-KR')}원
              </div>
            </div>
          </>
        ) : activeCalendarTab == 'tab2' ? (
          <MonthSumGraphCard
            activeCalendarTab="tab2"
            groupedSpending={groupedSpending}
            handleCalendarTabChange={handleCalendarTabChange}
          />
        ) : (
          <>
            <div className="w-full flex">
              <div className="flex w-full justify-between bg-blue-100 m-5 px-5 pt-10 pb-5 rounded-lg overflow-auto">
                {amountList.map((amount, index) => (
                  <>
                    <div className="flex items-end justify-between">
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
                        amountListLength={amountList.length}
                        activeCalendarTab={activeCalendarTab}

                        // meanLenght={meanLenght}
                      />
                    </div>
                  </>
                ))}
              </div>
            </div>
            <div className="mx-5 mb-5 p-2 bg-slate-100 rounded-lg flex justify-between">
              {/* <div className="flex flex-row"> */}
              {/* Todo..평균지출금액 옆 아주 짧은 빨간 선 */}
              {/* 왜 빨간줄 안나와.. */}
              {/* <div className="w-[10px] h-[5px] bg-error my-auto top-3"></div> */}
              <div className="my-auto font-scDreamRegular text-xs">
                평균지출금액
              </div>
              {/* </div> */}
              <div className="my-auto text-xs font-scDreamExBold">
                {Math.round(averageAmount()).toLocaleString('ko-KR')}원
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
export default SumGraphCard
