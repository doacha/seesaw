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

// 내가 데이터 호출을 할 때 1부터 현재 해당하는 달 -1 까지 호출해야해
// monthSumList에 호출한 객체를 추가..?
const monthSumList: Spending[] = [
  {
    spendingCostSum: 224000,
    spendingMonth: 1,
    memberEmail: 'doacha@seesaw.com',
  },
  {
    spendingCostSum: 324000,
    spendingMonth: 2,
    memberEmail: 'doacha@seesaw.com',
  },
  {
    spendingCostSum: 440000,
    spendingMonth: 3,
    memberEmail: 'doacha@seesaw.com',
  },
  {
    spendingCostSum: 143000,
    spendingMonth: 4,
    memberEmail: 'doacha@seesaw.com',
  },
  {
    spendingCostSum: 530000,
    spendingMonth: 5,
    memberEmail: 'doacha@seesaw.com',
  },
  {
    spendingCostSum: 233400,
    spendingMonth: 6,
    memberEmail: 'doacha@seesaw.com',
  },
  {
    spendingCostSum: 358000,
    spendingMonth: 7,
    memberEmail: 'doacha@seesaw.com',
  },
  {
    spendingCostSum: 150000,
    spendingMonth: 8,
    memberEmail: 'doacha@seesaw.com',
  },
]

const spend: Spending[] = [
  {
    spendingCostSum: 2240000,
    spendingMonth: 9,
    memberEmail: 'doacha@seesaw.com',
  },
]

const Report = () => {
  const clickArrow = () => {
    console.log('화살표 클릭')
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }
  const [activeTab, setActiveTab] = useState<string>('tab1')

  const spendMonth = spend[0].spendingMonth

  const [activeCalendarTab, setActiveCalendarTab] = useState<string>('tab1')
  const handleCalendarTabChange = (tab: string) => {
    setActiveCalendarTab(tab)
  }
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
        <SumGraphCard
          handleCalendarTabChange={handleCalendarTabChange}
          activeCalendarTab={activeCalendarTab}
          monthSumList={monthSumList}
        />
      </div>
    </div>
  )
}
export default Report
