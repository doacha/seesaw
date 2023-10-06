'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import Header from '../components/Header'
import Tab from '../components/Tab'

import CalendarCard from './components/calendar/CalendarCard'
import TextCard from './components/TextCard'
import DoughtnutChartCard from './components/DoughnutChartCard'
import SumGraphCard from './components/verticalbar/SumGraphCard'
import Swal from 'sweetalert2'

import { Spending } from '@/app/types'
import Loading from '@/app//components/Loading'

import { memberEmailStore } from '@/stores/memberEmail'
import { redirect } from 'next/navigation'

const ReportPage = () => {
  const router = useRouter()
  const { memberEmail } = memberEmailStore()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [activeTab, setActiveTab] = useState<string>('tab1')

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const [spendData, setSpendData] = useState<Spending>({
    memberEmail: memberEmail,
    spendingYear: new Date().getFullYear(),
    spendingMonth: new Date().getMonth(),
    spendingCostSum: 0,
  })

  const [clickEvent, setClickEvent] = useState<boolean>(false)

  const [clickDirection, setClickDirection] = useState<number>(0)
  const clickArrowRight = () => {
    const newMonth = (spendData.spendingMonth as number) + 1
    const newYear = (spendData.spendingYear as number) + 1
    if (newMonth <= 12) {
      setSpendData({
        ...spendData,
        spendingMonth: newMonth,
      })
    } else {
      setSpendData({
        ...spendData,
        spendingMonth: 1,
        spendingYear: newYear,
      })
    }
    setClickEvent((prev) => !prev)
    setClickDirection(0)
  }

  const clickArrowLeft = () => {
    const newMonth = (spendData.spendingMonth as number) - 1
    const newYear = (spendData.spendingYear as number) - 1
    if (newMonth >= 1) {
      setSpendData({
        ...spendData,
        spendingMonth: newMonth,
      })
    } else {
      setSpendData({
        ...spendData,
        spendingMonth: 12,
        spendingYear: newYear,
      })
    }
    setClickEvent((prev) => !prev)
    setClickDirection(1)
  }
  const fetchMonthSum = () => {
    fetch(`${process.env.NEXT_PUBLIC_SEESAW_API_URL}/spending/monthsum`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(spendData),
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setSpendData(data)
        setIsLoading(false)
      })
      .catch((err) => {
        Swal.fire({
          width: 300,
          text: '저장된 데이터가 없습니다!',
          icon: 'error',
        })
        if (
          (spendData.spendingMonth as number) === new Date().getMonth() &&
          spendData.spendingYear === new Date().getFullYear()
        ) {
          router.back()
          return
        }
        if (clickDirection === 0) {
          if ((spendData.spendingMonth as number) === 1) {
            setSpendData({
              ...spendData,
              ['spendingYear']: (spendData.spendingYear as number) - 1,
              ['spendingMonth']: 12,
            })
          } else {
            setSpendData({
              ...spendData,
              ['spendingMonth']: (spendData.spendingMonth as number) - 1,
            })
          }
        } else if (clickDirection === 1) {
          if ((spendData.spendingMonth as number) === 12) {
            setSpendData({
              ...spendData,
              ['spendingYear']: (spendData.spendingYear as number) + 1,
              ['spendingMonth']: 1,
            })
          } else {
            setSpendData({
              ...spendData,
              ['spendingMonth']: (spendData.spendingMonth as number) + 1,
            })
          }
        }
      })
  }
  useEffect(() => {
    if (memberEmail === '') redirect('./login')
  }, [])

  useEffect(() => {
    fetchMonthSum()
  }, [clickEvent])

  const [activeCalendarTab, setActiveCalendarTab] = useState<string>('tab1')
  const handleCalendarTabChange = (tab: string) => {
    setActiveCalendarTab(tab)
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-screen h-screen bg-background-fill">
          <div>
            <Header title="소비리포트" backButton />
          </div>
          <div className="h-full py-16 overflow-auto">
            <div className="flex h-32 bg-white">
              <div className="h-full flex flex-col justify-between mx-5">
                <div className="my-auto">
                  <div className="flex flex-row gap-3 mb-1">
                    <button
                      className="my-auto w-6 h-6"
                      onClick={clickArrowLeft}
                      type="button"
                      name="left-arrow"
                    >
                      <FontAwesomeIcon
                        icon={faChevronLeft}
                        style={{ color: '#001b2a' }}
                      />
                    </button>
                    <p className="text-2xl font-envR">
                      {spendData.spendingYear}년 {spendData.spendingMonth}월
                    </p>
                    {spendData.spendingMonth === new Date().getMonth() &&
                    spendData.spendingYear ===
                      new Date().getFullYear() ? null : (
                      <button
                        className="my-auto w-6 h-6"
                        onClick={clickArrowRight}
                        type="button"
                        name="right-arrow"
                      >
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          style={{ color: '#001b2a' }}
                        />
                      </button>
                    )}
                  </div>
                  <p className="text-3xl font-envR">
                    {spendData.spendingCostSum &&
                      spendData.spendingCostSum.toLocaleString('ko-KR')}
                    원
                  </p>
                </div>
              </div>
            </div>
            <Tab
              labels={['통계', '캘린더']}
              activeTab={activeTab}
              handleTabChange={handleTabChange}
            />
            {activeTab == 'tab2' ? (
              <div className="flex w-full p-5">
                <CalendarCard spendData={spendData} />
              </div>
            ) : (
              <>
                <div className="flex p-5">
                  <TextCard spendData={spendData} />
                </div>
                <div className="flex px-5 pb-5">
                  <DoughtnutChartCard spendData={spendData} />
                </div>
                <div className="flex px-5 pb-5">
                  <SumGraphCard
                    handleCalendarTabChange={handleCalendarTabChange}
                    activeCalendarTab={activeCalendarTab}
                    spendData={spendData}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
export default ReportPage
