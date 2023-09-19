'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import Header from '../components/Header'
import Tab from '../components/Tab'
import { useState } from 'react'

import CalendarCard from './components/CalendarCard'
import TextCard from './components/TextCard'
import SumGraphCard from './components/SumGraphCard'
import { Spending } from '@/app/types'

import { sumList } from '../dummies'
import { spend } from '../dummies'
// 내가 데이터 호출을 할 때 1부터 현재 해당하는 달 -1 까지 호출해야해
// monthSumList에 호출한 객체 append해주기

// 여기의 spendingMonth는 뭐지?
// 일단 백으로 요청보낼때 spendingMonth는 무조건 전해줘야해

const Report = () => {
  const clickArrow = () => {
    console.log('화살표 클릭')
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }
  // 통계 / 캘린더
  const [activeTab, setActiveTab] = useState<string>('tab1')

  const spendMonth = spend[0].spendingMonth

  const [activeCalendarTab, setActiveCalendarTab] = useState<string>('tab1')
  const handleCalendarTabChange = (tab: string) => {
    setActiveCalendarTab(tab)
  }

  // 해당 date가 몇주차인지 알기위한 함수
  const formatWeek = (date: Date): string => {
    const currentDate = date.getDate()
    const firstDay = new Date(date.setDate(1)).getDay()

    return Math.ceil((currentDate + firstDay) / 7) + '주차'
  }

  // 주차 추출
  const groupSpendingByWeek = (sumList: Spending[]): Record<string, number> => {
    const groupedData: Record<string, number> = {}

    sumList.forEach((spending: Spending) => {
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

    return groupedData
  }

  const groupedSpending = groupSpendingByWeek(sumList)
  console.log(groupedSpending)

  return (
    <div className="w-screen h-screen bg-background-fill">
      <div>
        <Header title="소비리포트" backButton route="/home" />
      </div>
      <div className="h-full py-16 overflow-auto">
        <div className="flex h-32 bg-white">
          {spend.map((spending, key) => (
            <div className="h-full flex flex-col justify-between mx-5">
              <div className="my-auto">
                <div className="flex flex-row gap-3 mb-1">
                  <button
                    className="my-auto w-6 h-6"
                    onClick={clickArrow}
                    type="button"
                    name="left-arrow"
                  >
                    <FontAwesomeIcon
                      icon={faChevronLeft}
                      style={{ color: '#001b2a' }}
                    />
                  </button>
                  <p className="text-2xl font-envR">
                    {spending.spendingMonth}월
                  </p>
                  <button
                    className="my-auto w-6 h-6"
                    onClick={clickArrow}
                    type="button"
                    name="right-arrow"
                  >
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      style={{ color: '#001b2a' }}
                    />
                  </button>
                </div>
                <p className="text-3xl font-envR">
                  {spending.spendingCostSum &&
                    spending.spendingCostSum.toLocaleString('ko-KR')}
                  원
                </p>
              </div>
            </div>
          ))}
        </div>
        <Tab
          labels={['통계', '캘린더']}
          activeTab={activeTab}
          handleTabChange={handleTabChange}
        />
        {activeTab == 'tab2' && <CalendarCard />}
        <div className="flex p-5">
          <TextCard />
        </div>
        <div className="flex px-5 pb-5">
          <SumGraphCard
            handleCalendarTabChange={handleCalendarTabChange}
            activeCalendarTab={activeCalendarTab}
            sumList={sumList}
            groupedSpending={groupedSpending}
          />
        </div>
      </div>
    </div>
  )
}
export default Report
