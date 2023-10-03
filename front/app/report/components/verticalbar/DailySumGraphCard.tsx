'use client'
import { useState, useEffect } from 'react'

import ReportVerticalGraphBar from './ReportVerticalGraphBar'
import { Spending } from '@/app/types'
import Loading from './Loading'

import { QueryKey, useQuery } from '@tanstack/react-query'

interface DailySumGraphCardProps {
  activeCalendarTab: string
  spendData: Spending
}
const DailySumGraphCard = ({
  activeCalendarTab,
  spendData,
}: DailySumGraphCardProps) => {
  // Todo 왜 그래프 막대가 바로 나오지 않는거지?
  // 일별 데이터 합계 가져오는 중
  const fetchDailySumList = async (spendData: Spending) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/spending/dailysum`,
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
    data: sumList,
    error,
  } = useQuery(['sumList', spendData], () => fetchDailySumList(spendData))

  // 각각의 합계를 배열로 만들기 위한 변수 코드
  let amountList: number[] =
    sumList && sumList.map((element: any) => element.spendingCostSum as number)
  // 평균지출금액 구하기 위한 함수
  const averageAmount = () => {
    let sum = 0
    for (let i = 0; i < amountList.length; i++) {
      sum += amountList[i]
    }
    return sum / amountList.length
  }

  // 막대그래프 높이 저장하기 위한 배열
  const [lengthList, setLengthList] = useState<string[]>([])

  useEffect(() => {
    let mean = 0
    const tmpLengthList: string[] = []
    if (amountList) {
      for (let i = 0; i < amountList.length; i++) {
        const tmp = `${(Math.round(amountList[i]) / averageAmount()) * 30}px`
        mean += (Math.round(amountList[i]) / averageAmount()) * 30
        tmpLengthList.push(tmp)
      }
    }
    setLengthList(tmpLengthList)
  }, [sumList])

  return (
    <>
      {isLoading || lengthList.length === 0 ? (
        <Loading />
      ) : (
        <>
          <div className="w-full relative flex">
            <div className="flex relative w-full h-[300px] justify-between bg-blue-100 m-5 px-5 pt-10 pb-5 rounded-lg overflow-auto">
              {amountList.map((amount, index) => (
                <div key={index} className="flex items-end justify-between">
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
                    amountListLength={amountList.length}
                    activeCalendarTab={activeCalendarTab}
                  />
                </div>
              ))}
            </div>
            {/* 55가 0점 */}
            <div
              className={`flex flex-col absolute items-start bottom-[85px] w-[75%] left-10`}
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
      )}
    </>
  )
}

export default DailySumGraphCard
