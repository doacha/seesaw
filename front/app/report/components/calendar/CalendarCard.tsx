'use client'

import { useState, useEffect } from 'react'
import Calendar from 'react-calendar' // react-calendar 라이브러리
import moment from 'moment-timezone' // 날짜 데이터 관리
import '../../styles/calendar.css' // calendar 전체 style

import { Spending } from '@/app/types'
import Loading from '@/app/components/Loading'

import { QueryKey, useQuery } from '@tanstack/react-query'

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]
type Props = {
  spendData: Spending
}
const CalendarCard = ({ spendData }: Props) => {
  const [value, onChange] = useState<Value>(
    new Date(
      spendData.spendingYear as number,
      (spendData.spendingMonth as number) - 1,
      1,
    ),
  )

  useEffect(() => {
    onChange(
      new Date(
        spendData.spendingYear as number,
        (spendData.spendingMonth as number) - 1,
        1,
      ),
    )
  }, [spendData])

  // Todo.. 날짜 클릭하면 상세 정보나오기
  const showModal = (newValue: Value) => {
    onChange(newValue)
  }

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

  const mark =
    sumList &&
    sumList.map((element: Spending, idx: number) => {
      const formattedDate = moment
        .utc(element.spendingDate)
        .tz('Asia/Seoul')
        .format('YYYY-MM-DD')
      return formattedDate
    })

  const consumption =
    sumList &&
    sumList.map((element: Spending, idx: number) => element.spendingCostSum)

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Calendar
          calendarType="gregory" // 요일은 일요일부터 시작
          onChange={onChange} // useState로 포커스 변경 시 현재 날짜 받아오기
          formatDay={(locale, date) => moment(date).format('DD')} // 날'일' 제외하고 숫자만 보이도록 설정
          value={value}
          minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
          maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
          showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
          className="flex justify-center items-center w-full text-sm shadow-lg"
          showNavigation={false} // navigation 보여줘? 아니 보여주지 마
          tileContent={({ date, view }) => {
            // 날짜 타일에 컨텐츠 추가하기 (html 태그)
            // 추가할 html 태그를 변수 초기화
            let html = []

            // 현재 날짜에 해당하는 money 값을 가져옴
            const moneyIndex = mark.findIndex(
              (x: any) => x === moment(date).format('YYYY-MM-DD'),
            )
            if (moneyIndex !== -1) {
              html.push(
                consumption[moneyIndex] === 0 ? (
                  <span
                    key={moneyIndex}
                    className="font-scDreamRegula text-xs mx-auto text-yellow-500"
                  >
                    무지출
                  </span>
                ) : (
                  <span
                    key={moneyIndex}
                    className="font-scDreamRegula text-xs text-outline"
                  >
                    -{consumption[moneyIndex]?.toLocaleString('ko-KR')}
                  </span>
                ),
              )
            }

            return (
              <>
                <div className="flex justify-center items-center">{html}</div>
              </>
            )
          }}
        />
      )}
    </>
  )
}

export default CalendarCard
