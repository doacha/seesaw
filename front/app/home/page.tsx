'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import FaskMakeButton from '../components/FastMakeButton'
import HomeHeader from './components/HomeHeader'
import SortButtons from './components/SortButton'
import SpendingList from './components/SpendingList'
import AddPostModal from './components/AddPostModal'

import { memberEmailStore } from '@/stores/memberEmail'

import CategoryList from './components/CategoryList'
import { Spending } from '../types'

const HomePage = () => {
  const router = useRouter()
  const { memberEmail, setMemberEmail } = memberEmailStore()
  const [spendData, setSpendData] = useState<Spending>({
    memberEmail: '',
    spendingYear: 0,
    spendingMonth: 0,
  })

  // 화살표 클릭 감지
  const [clickEvent, setClickEvent] = useState<boolean>(false)
  // zustand에 저장된 email 가져오기
  // console.log(memberEmail)

  const [sort, setSort] = useState('최신순')

  const [open, setOpen] = useState(false)

  const clickReport = () => {
    router.push('/report')
  }
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
    console.log('arrow 오른쪽 클릭')
    console.log(spendData)
    setClickEvent((prev) => !prev)
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
    console.log(spendData)
    setClickEvent((prev) => !prev)
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

  const toDayYearMonth = new Date()

  const dailySumData: {
    memberEmail: string
    spendingYear: number
    spendingMonth: number
  } = {
    // zustand에 들어있는 친구를 들고와야해
    memberEmail: 'doacha@seesaw.com',
    spendingYear: toDayYearMonth.getFullYear(),
    spendingMonth: toDayYearMonth.getMonth() + 1,
  }
  const fetchMonthSum = () => {
    fetch(`${process.env.NEXT_PUBLIC_SEESAW_API_URL}/spending/monthsum`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // JSON 데이터를 전송할 경우 지정
      },
      body: JSON.stringify(dailySumData), // 데이터를 JSON 문자열로 변환하여 전송
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setSpendData(data)
      })
  }
  useEffect(() => {
    fetchMonthSum()
  }, [clickEvent])

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

  console.log(state)
  const newSelected: number[] = [] // state 기반으로 선택된 카테고리 값 배열 생성
  state.forEach((element, idx) => {
    if (element) {
      newSelected.push(idx)
    }
  })

  const handleToggle = () => {
    // setOpen((prev) => !prev) 이거 왜 안됨?
    setOpen(!open)
  }

  return (
    <>
      <div className="flex flex-col h-screen bg-background-fill">
        <div className="w-full h-44 bg-background">
          <HomeHeader
            spendingYear={toDayYearMonth.getFullYear()}
            spend={spendData}
            clickArrowRight={clickArrowRight}
            clickArrowLeft={clickArrowLeft}
            clickReport={clickReport}
          />
          <CategoryList onClick={clickCategory} state={state} />
        </div>
        <div className="h-[48px]">
          <SortButtons clickText={clickText} sort={sort} />
        </div>
        <div className="overflow-auto">
          <div className="mx-5 mt-5 pb-20">
            <SpendingList
              spendData={spendData}
              formatTime={formatTime}
              sort={sort}
              formatDayTime={formatDayTime}
              openBoolean={open}
              clickEvent={clickEvent}
              // 카테고리 선택 관련
              newSelected={newSelected}
            />
          </div>
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
