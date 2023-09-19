'use client'

import { useState } from 'react'
import FaskMakeButton from '../components/FastMakeButton'
import { Spending } from '@/app/types'

import { useRouter } from 'next/navigation'
import HomeHeader from './components/HomeHeader'
import SortButtons from './components/SortButton'
import SpendingList from './components/SpendingList'

import CategoryList from './components/CategoryList'

const spend: Spending[] = [
  {
    spendingCostSum: 2240000,
    spendingMonth: 9,
    memberEmail: 'doacha@seesaw.com',
  },
]
const spendingList: Spending[] = [
  {
    spendingId: 3,
    spendingTitle: 'test',
    spendingCost: 1110000,
    spendingDate: '2023-09-13T07:36:18.000+00:00',
    spendingCategoryId: 1,
    memberEmail: 'doacha@seesaw.com',
  },
  {
    spendingId: 0,
    spendingTitle: 'test',
    spendingCost: 1110000,
    spendingDate: '2023-09-15T07:36:18.000+00:00',
    spendingCategoryId: 2,
    memberEmail: 'doacha@seesaw.com',
  },
  {
    spendingId: 2,
    spendingTitle: 'testzzz',
    spendingCost: 111,
    spendingDate: '2023-09-13T07:40:06.978+00:00',
    spendingCategoryId: 18,
    memberEmail: 'doacha@seesaw.com',
  },
]
const Home = () => {
  const [sort, setSort] = useState('최신순')
  // 카테고리 클릭 시 해당 캡슐 색상 변하고
  const clickReport = () => {
    console.log('소비리포트 클릭')
  }
  const clickArrow = () => {
    console.log('arrow 클릭')
  }
  const clickText = (e: any) => {
    console.log('최신순, 고액순 클릭')
    setSort(e.target.innerText)
  }
  const router = useRouter()

  const clickDetail = () => {
    // 해당 내역의 번호를 가지고 페이지 이동해야해
    router.push('/home/detail')
  }

  const formatTime = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
    }

    const formatter = new Intl.DateTimeFormat('ko-KR', options)
    return formatter.format(date)
  }

  const formatDay = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      weekday: 'long',
    }
    const formatter = new Intl.DateTimeFormat('ko-KR', options)
    return formatter.format(date)
  }

  const formatDayTime = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
    }
    const formatter = new Intl.DateTimeFormat('ko-KR', options)
    return formatter.format(date)
  }

  // 'spendingList'를 일자별로 그룹화하기 위한 함수
  const groupSpendingByDay = (
    spendingList: Spending[],
  ): Record<string, Spending[]> => {
    const groupedData: Record<string, Spending[]> = {}

    spendingList.forEach((spending: Spending) => {
      const day = formatDay(new Date(spending.spendingDate as string))

      if (!groupedData[day]) {
        groupedData[day] = []
      }
      groupedData[day].push(spending)
    })

    return groupedData
  }

  // 'spendingList'를 일자별로 그룹화합니다.
  const groupedSpending = groupSpendingByDay(spendingList)

  const clickPlus = () => {
    console.log('플버 클릭')
  }

  const [state, setState] = useState<number[]>([])
  const clickCategory = (id: number, isSelected: boolean) => {
    const newSelected = [...state]
    console.log(id)
    if (isSelected) {
      const idx = newSelected.indexOf(id)
      newSelected.splice(idx, 1)
      setState(newSelected)
    } else {
      newSelected.push(id)
      setState(newSelected)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-background-fill">
      <div className="w-full h-44 bg-background">
        <HomeHeader
          spend={spend}
          clickArrow={clickArrow}
          clickReport={clickReport}
        />
        <CategoryList onClick={clickCategory} />
      </div>
      <SortButtons clickText={clickText} sort={sort} />
      <div className="mx-5 my-5">
        <SpendingList
          formatTime={formatTime}
          sort={sort}
          groupedSpending={groupedSpending}
          formatDayTime={formatDayTime}
          clickDetail={clickDetail}
          spendingList={spendingList}
          // newSelected = {newSelected}
        />
      </div>
      <div className="fixed top-[690px] right-[20px]">
        <FaskMakeButton onClick={clickPlus} />
      </div>
    </div>
  )
}

export default Home
