'use client'

import { useState, useEffect } from 'react'
import ReportVerticalGraphBar from './ReportVerticalGraphBar'
import Loading from './Loading'
import { QueryKey, useQuery } from '@tanstack/react-query'

import { Spending } from '@/app/types'

interface MonthSumGraphCardProps {
  activeCalendarTab: string
  spendData: Spending
}

const MonthSumGraphCard = ({
  activeCalendarTab,
  spendData,
}: MonthSumGraphCardProps) => {
  const fetchMonthSumList = async (spendData: Spending) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/spending/monthsumlist`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // JSON 데이터를 전송할 경우 지정
        },
        body: JSON.stringify(spendData), // 데이터를 JSON 문자열로 변환하여 전송
      },
    )
    return await res.json()
  }
  const {
    isLoading,
    data: monthSumList,
    error,
  } = useQuery(['monthSumList', spendData], () => fetchMonthSumList(spendData))

  let monthSumAmountList: number[] =
    monthSumList &&
    monthSumList.map((element: any) => element.spendingCostSum as number)

  const averageMonthAmount = () => {
    let sum = 0
    for (let i = 0; i < monthSumAmountList.length; i++) {
      sum += monthSumAmountList[i]
    }
    return sum / monthSumAmountList.length
  }

  // 막대그래프 높이 저장하기 위한 배열
  const [lengthList, setLengthList] = useState<string[]>([])

  useEffect(() => {
    let mean = 0
    const tmpLengthList: string[] = []
    if (monthSumAmountList) {
      for (let i = 0; i < monthSumAmountList.length; i++) {
        const tmp = `${
          (Math.round(monthSumAmountList[i]) / averageMonthAmount()) * 100
        }px`
        mean += (Math.round(monthSumAmountList[i]) / averageMonthAmount()) * 100
        tmpLengthList.push(tmp)
      }
    }
    setLengthList(tmpLengthList)
  }, [monthSumList])
  return (
    <>
      {/* Todo 데이터 없는 경우.. */}
      {isLoading || lengthList.length === 0 ? (
        <Loading />
      ) : (
        <>
          <div className="w-full relative flex">
            <div className="flex relative w-full h-[300px] justify-between gap-6 bg-blue-100 m-5 px-5 pt-10 pb-5 rounded-lg overflow-auto">
              {monthSumAmountList.map((amount, index) => (
                <div key={index} className="flex items-end justify-between">
                  <ReportVerticalGraphBar
                    // 0년 0월을 처리하기 위한 변수
                    spendingYear={monthSumList[index].spendingYear.toString()}
                    spendingMonth={monthSumList[index].spendingMonth}
                    amount={amount}
                    length={lengthList[index]}
                    bgColor={
                      index === monthSumAmountList.length - 1
                        ? 'bg-primary'
                        : 'bg-blue-300'
                    }
                    txtColor={
                      index === monthSumAmountList.length - 1
                        ? 'text-secondary'
                        : 'text-black'
                    }
                    amountListLength={monthSumAmountList.length}
                    activeCalendarTab={activeCalendarTab}
                  />
                </div>
              ))}
            </div>
            {/* 55가 0점 */}
            <div
              className={`flex flex-col w-[75%] left-10 absolute items-start bottom-[155px]`}
            >
              <div
                className={
                  'flex text-[10px] min-w-max text-error font-scDreamLight'
                }
              >
                평균
                {Math.round(averageMonthAmount()).toLocaleString('ko-KR')}원
              </div>
              <div className="bg-error rounded-full w-full h-[3px]"></div>
            </div>
          </div>
          <div className="mx-5 mb-5 p-2 bg-slate-100 rounded-lg  flex justify-between">
            <div className="flex flex-row">
              <div className=" bg-error mx-auto my-auto w-[15px] h-[5px] rounded-md"></div>
              <div className="ml-1 my-auto font-scDreamRegular text-xs">
                평균지출금액
              </div>
            </div>
            <div className="my-auto text-xs font-scDreamExBold">
              {Math.round(averageMonthAmount()).toLocaleString('ko-KR')}원
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default MonthSumGraphCard
