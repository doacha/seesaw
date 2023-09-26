'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import FaskMakeButton from '../components/FastMakeButton'
import HomeHeader from './components/HomeHeader'
import SortButtons from './components/SortButton'
import SpendingList from './components/SpendingList'
import AddPostModal from './components/AddPostModal'

import { Spending } from '@/app/types'
import { spend } from '../dummies'

import { memberEmailStore } from '@/stores/memberEmail'

import CategoryList from './components/CategoryList'

const HomePage = () => {
  const router = useRouter()
  const { memberEmail, setMemberEmail } = memberEmailStore()

  // zustand에 저장된 email 가져오기
  // console.log(memberEmail)

  const [sort, setSort] = useState('최신순')
  const [spendingList, setSpendingList] = useState<Spending[]>([])

  const data: {
    memberEmail: string
    spendingYear: number
    spendingMonth: number
    condition: 'spendingDate' | 'spendingCost'
  } = {
    // 변경이 필요함 email은 zustand에 있는 것
    memberEmail: 'doacha@seesaw.com',
    // spendingYear은 어케하징?
    spendingYear: 2023,
    // spendingMonth는 어케하징?
    spendingMonth: 9,
    condition: sort === '최신순' ? 'spendingDate' : 'spendingCost',
  }
  const fetchSpendingList = () => {
    fetch(`${process.env.NEXT_PUBLIC_SEESAW_API_URL}/spending/list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // JSON 데이터를 전송할 경우 지정
      },
      body: JSON.stringify(data), // 데이터를 JSON 문자열로 변환하여 전송
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        // console.log(data)
        setSpendingList(data)
      })
  }
  useEffect(() => {
    fetchSpendingList()
  }, [data.condition])

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
  const [state, setState] = useState<boolean[]>(Array(21).fill(false))
  // 미분류 포함하면 총 21개
  const clickCategory = (id: number, isSelected: boolean) => {
    const newState = [...state]
    newState[id] = !isSelected
    newState[0] = false //전체 이외의 카테고리 클릭 시 전체 카테고리 해제
    if (id === 0 && !isSelected) {
      //전체 카테고리 활성화시, 이외 카테고리 해제
      newState.fill(false)
      newState[0] = true
    }
    setState(newState)
  }

  const newSelected: number[] = [] // state 기반으로 선택된 카테고리 값 배열 생성
  state.forEach((element, idx) => {
    if (element) {
      newSelected.push(idx)
    }
  })

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
            // 카테고리 선택 관련
            newSelected={newSelected}
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
