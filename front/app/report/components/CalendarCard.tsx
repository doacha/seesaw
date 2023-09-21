'use client'

import Calendar from 'react-calendar'
import moment from 'moment' // 날짜 데이터 관리
import { useState } from 'react'
import '../styles/calendar.css'

import { sumList } from '@/app/dummies'

type ValuePiece = Date | null

type Value = ValuePiece | [ValuePiece, ValuePiece]

const CalendarCard = () => {
  const [value, onChange] = useState<Value>(new Date())
  // todo...클릭시 해당 요일 데이터 모달로 띄워야 함

  // const mark = ['2023-09-21', '2023-09-20', '2023-09-19']
  const mark = sumList.map((element, idx) =>
    moment(element.spendingDate).format('YYYY-MM-DD'),
  )
  const consumption = sumList.map((element, idx) => element.spendingCostSum)
  return (
    <Calendar
      calendarType="US" // 요일은 일요일부터 시작
      onChange={onChange} // useState로 포커스 변경 시 현재 날짜 받아오기
      formatDay={(locale, date) => moment(date).format('DD')} // 날'일' 제외하고 숫자만 보이도록 설정
      value={value}
      minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
      maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
      showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
      className="mx-auto w-full text-sm border-b"
      tileContent={({ date, view }) => {
        // 날짜 타일에 컨텐츠 추가하기 (html 태그)
        // 추가할 html 태그를 변수 초기화
        let html = []

        // 현재 날짜에 해당하는 money 값을 가져옴
        const moneyIndex = mark.findIndex(
          (x) => x === moment(date).format('YYYY-MM-DD'),
        )
        if (moneyIndex !== -1) {
          html.push(
            consumption[moneyIndex] === 0 ? (
              <span className="font-scDreamRegula text-xs mx-auto text-yellow-500">
                무지출
              </span>
            ) : (
              <span className="font-scDreamRegula text-xs text-outline">
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
  )
}

export default CalendarCard
