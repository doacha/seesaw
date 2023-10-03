'use client'
import { useState, useEffect } from 'react'

import ReportVerticalGraphBar from './ReportVerticalGraphBar'
import ReportTab from './ReportVerticalTab'
import { Spending } from '@/app/types'
import WeekSumGraphCard from './WeekSumGraphCard'
import MonthSumGraphCard from './MonthSumGraphCard'
import DailySumGraphCard from './DailySumGraphCard'
import Loading from '@/app/components/Loading'

import { QueryKey, useQuery } from '@tanstack/react-query'

interface SumGraphCardProps {
  handleCalendarTabChange: (tab: string) => void
  activeCalendarTab: string
  spendData: Spending
}
const SumGraphCard = ({
  handleCalendarTabChange,
  activeCalendarTab,
  spendData,
}: SumGraphCardProps) => {
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
  } = useQuery(['sumList', spendData, activeCalendarTab], () =>
    fetchDailySumList(spendData),
  )

  // 해당 date가 몇주차인지 알기위한 함수
  const formatWeek = (date: Date): string => {
    const currentDate = date.getDate()
    const firstDay = new Date(date.setDate(1)).getDay()
    return Math.ceil((currentDate + firstDay) / 7) + '주차'
  }

  // 주차 추출 위한 함수
  const groupSpendingByWeek = (sumList: any): Record<string, number> => {
    const groupedData: Record<string, number> = {}

    if (sumList) {
      sumList.forEach((spending: any) => {
        const week = formatWeek(new Date(spending.spendingDate as string))
        const spendingCost = spending.spendingCostSum as number
        // 해당주차에 값있어? 누적해
        if (groupedData[week]) {
          groupedData[week] += spendingCost
        } else {
          //해당주차에 값없어? 초기화
          groupedData[week] = spendingCost
        }
      })
    }
    return groupedData
  }
  const groupedSpending = groupSpendingByWeek(sumList)

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

  // useEffect를 안쓰면 애가 무한렌더링에 걸린다.
  useEffect(() => {
    if (activeCalendarTab === 'tab2') {
      let mean = 0
      const tmpLengthList: string[] = []
      if (amountList) {
        for (let i = 0; i < amountList.length; i++) {
          const tmp = `${(Math.round(amountList[i]) / averageAmount()) * 40}px`
          mean += (Math.round(amountList[i]) / averageAmount()) * 40
          tmpLengthList.push(tmp)
        }
      }
      setLengthList(tmpLengthList)
    }
  }, [activeCalendarTab, spendData])
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="h-[440px] w-full bg-background rounded-lg">
          <div className="flex flex-col w-full">
            <ReportTab
              handleCalendarTabChange={handleCalendarTabChange}
              activeCalendarTab={activeCalendarTab}
            />
            {activeCalendarTab == 'tab1' ? (
              <MonthSumGraphCard
                activeCalendarTab="tab1"
                spendData={spendData}
              />
            ) : activeCalendarTab == 'tab2' ? (
              <WeekSumGraphCard
                activeCalendarTab="tab2"
                groupedSpending={groupedSpending}
              />
            ) : (
              <DailySumGraphCard
                activeCalendarTab="tab3"
                spendData={spendData}
              />
              //   <>
              //     <div className="w-full relative flex">
              //       <div className="flex relative w-full h-[300px] justify-between bg-blue-100 m-5 px-5 pt-10 pb-5 rounded-lg overflow-auto">

              //         {amountList.map((amount, index) => (
              //           <div
              //             key={index}
              //             className="flex items-end justify-between"
              //           >
              //             <ReportVerticalGraphBar
              //               amount={amount}
              //               length={lengthList[index]}
              //               round={index}
              //               bgColor={
              //                 index === amountList.length - 1
              //                   ? 'bg-primary'
              //                   : 'bg-blue-300'
              //               }
              //               txtColor={
              //                 index === amountList.length - 1
              //                   ? 'text-secondary'
              //                   : 'text-black'
              //               }
              //               amountListLength={amountList.length}
              //               activeCalendarTab={activeCalendarTab}

              //               // meanLenght={meanLenght}
              //             />
              //           </div>
              //         ))}
              //       </div>
              //       <div
              //           className={`flex flex-col absolute  items-start bottom-[75px]`}
              //         >
              //           <div
              //             className={
              //               'flex text-[10px] min-w-max text-error  font-scDreamLight'
              //             }
              //           >
              //             평균
              //             {Math.round(averageAmount()).toLocaleString('ko-KR')}원
              //           </div>
              //           <div className="bg-error  rounded-full w-full h-[3px]"></div>
              //         </div>
              //     </div>
              //     <div className="mx-5 mb-5 p-2 bg-slate-100 rounded-lg flex justify-between">
              //       <div className="flex flex-row">
              //         <div className=" bg-error mx-auto my-auto w-[15px] h-[5px] rounded-md"></div>
              //         <div className="ml-1 my-auto font-scDreamRegular text-xs">
              //           평균지출금액
              //         </div>
              //       </div>
              //       <div className="my-auto text-xs font-scDreamExBold">
              //         {Math.round(averageAmount()).toLocaleString('ko-KR')}원
              //       </div>
              //     </div>
              //   </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
export default SumGraphCard
