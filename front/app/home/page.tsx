'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import FaskMakeButton from '../components/FastMakeButton'
import HomeHeader from './components/HomeHeader'
import SortButtons from './components/SortButton'
import SpendingList from './components/SpendingList'
import AddPostModal from './components/AddPostModal'
import { Spending } from '@/app/types'
import { spend, spendingList } from '../dummies'

import { memberEmailStore } from '@/stores/memberEmail'

import CategoryList from './components/CategoryList'

const HomePage = () => {
  const router = useRouter()
  const { memberEmail, setMemberEmail } = memberEmailStore()
  // zustand에 저장된 email 가져오기
  console.log(memberEmail)
  const [sort, setSort] = useState('최신순')

  const clickReport = () => {
    router.push('/report')
  }
  const clickArrow = () => {
    console.log('arrow 클릭')
  }
  const clickText = (e: any) => {
    setSort(e.target.innerText)
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

  // 'spendingList'를 일자별로 그룹화!
  const groupedSpending = groupSpendingByDay(spendingList)

  // category 관련
  const [state, setState] = useState<number[]>([])
  const clickCategory = (id: number, isSelected: boolean) => {
    const newSelected = [...state]
    if (isSelected) {
      const idx = newSelected.indexOf(id)
      newSelected.splice(idx, 1)
      setState(newSelected)
    } else {
      newSelected.push(id)
      setState(newSelected)
    }
  }

  const [open, setOpen] = useState(false)
  const handleToggle = () => {
    // setOpen((prev) => !prev) 이거 왜 안됨?
    setOpen(!open)
  }

  return (
    <>
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
            spendingList={spendingList}
            // Todo 카테고리 선택 및 매핑 과정 필요
            // newSelected = {newSelected}
          />
        </div>
        <div className="fixed top-[690px] right-[20px]">
          <FaskMakeButton onClick={handleToggle} />
        </div>
      </div>
      <AddPostModal open={open} handleToggle={handleToggle} />
    </>
  )
}

export default HomePage
