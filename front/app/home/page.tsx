'use client'

import { useEffect, useState } from 'react'
import { redirect, useRouter } from 'next/navigation'
import FaskMakeButton from '../components/FastMakeButton'
import HomeHeader from './components/HomeHeader'
import SortButtons from './components/SortButton'
import SpendingList from './components/SpendingList'
import AddPostModal from './components/AddPostModal'
import Swal from 'sweetalert2'

import { memberEmailStore } from '@/stores/memberEmail'
import { UpdateDeleteCheckStore } from '@/stores/updateDeleteCheck'
import CategoryList from './components/CategoryList'
import { Spending } from '../types'

import EmptyAlert from './components/EmptyAlert'

import { currentTabStore } from '@/stores/currentTab'

const HomePage = () => {
  const router = useRouter()
  const { memberEmail } = memberEmailStore()
  const { checkUpdateDelete, setCheckUpdateDelete } = UpdateDeleteCheckStore()

  const [sort, setSort] = useState('최신순')
  const [spendData, setSpendData] = useState<Spending>({
    memberEmail: memberEmail,
    spendingYear: new Date().getFullYear(),
    spendingMonth: new Date().getMonth() + 1,
    condition: 'spendingDate', // 초기값은 'spendingDate'로 설정
  })
  const [spendingList, setSpendingList] = useState<Spending[]>([])

  const { setCurrentTab } = currentTabStore()

  // 화살표 클릭 감지
  const [clickEvent, setClickEvent] = useState<boolean>(false)

  // 화살표 우클릭==0 좌클릭==1
  const [clickDirection, setClickDirection] = useState<number>(0)

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
    // 우클릭 이벤트 발생
    setClickEvent((prev) => !prev)
    setClickDirection(0)
  }

  // 데이터 없는걸 처리하기 위한 변수
  const [isEmpty, setIsEmpty] = useState<boolean>(false)

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
    // 좌클릭 이벤트 발생
    setClickEvent((prev) => !prev)
    setClickDirection(1)
  }

  // 최신순, 고액순 클릭 시 sort 변경
  const clickText = (e: any) => {
    const newSort = e.target.innerText
    // setSort 왜있지?
    setSort(newSort)

    // sort 변경 시 condition 값을 업데이트
    if (newSort === '최신순') {
      setSpendData({
        ...spendData,
        condition: 'spendingDate',
      })
    } else {
      setSpendData({
        ...spendData,
        condition: 'spendingCost',
      })
    }
  }

  // 유저에게 보여지는 시간 표시
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

  const fetchRefresh = () => {
    fetch(`${process.env.NEXT_PUBLIC_SEESAW_API_URL}/spending/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // JSON 데이터를 전송할 경우 지정
      },
      body: spendData.memberEmail, // 데이터를 JSON 문자열로 변환하여 전송
    }).then((res) => {
      if (res.status === 200 || res.status === 204) {
        setCurrentTab('home')
        fetchSpendList()
      } else {
        Swal.fire({
          width: 300,
          text: '새로고침에 실패했습니다.',
          icon: 'error',
        })
      }
      return res
    })
  }
  // 전체 spendList를 page.tsx에서 불러올거야
  const fetchSpendList = () => {
    fetch(`${process.env.NEXT_PUBLIC_SEESAW_API_URL}/spending/list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // JSON 데이터를 전송할 경우 지정
      },
      body: JSON.stringify(spendData), // 데이터를 JSON 문자열로 변환하여 전송
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        if (data.length === 0) {
          setIsEmpty(true)
        } // 저장된 데이터가 있다면 spendingList에 내용 추가
        else {
          setIsEmpty(false)
          setSpendingList(data)
          let sum = 0
          data.forEach((element: any) => {
            sum += element.spendingCost as number
          })
          // 월 합계를 위한 변수
          setMonthTotalSum(sum)
        }
      })
  }

  const categoryInit = Array(21).fill(false)
  categoryInit[0] = true // 0은 true로 변경
  const [state, setState] = useState<boolean[]>(categoryInit)
  const clickCategory = (id: number, isSelected: boolean) => {
    const newState = [...state]
    if (id === 0 && !isSelected) {
      newState.fill(false)
      newState[0] = true
    } else {
      newState[id] = !isSelected
      newState[0] = false
    }

    if (newState.every((value) => !value)) {
      newState[0] = true
    }

    setState(newState)
  }

  const newSelected: number[] = state.reduce<number[]>(
    (selected, isSelected, idx) => {
      if (isSelected && idx !== 0) {
        selected.push(idx)
      } else if (isSelected && idx == 0) {
        selected.push(0)
      }
      return selected
    },
    [],
  )

  const handleToggle = () => {
    setOpen((prev) => !prev)
  }

  const [monthTotalSum, setMonthTotalSum] = useState<number>(0)

  useEffect(() => {
    if (memberEmail === '') redirect('./login')
  }, [])

  useEffect(() => {
    fetchRefresh()
  }, [spendData, clickEvent, open, sort, checkUpdateDelete])

  return (
    <>
      <div className="flex flex-col h-screen bg-background-fill">
        <div className="w-full h-44 bg-background">
          <HomeHeader
            isEmpty={isEmpty}
            spend={spendData}
            spendSum={monthTotalSum}
            clickArrowRight={clickArrowRight}
            clickArrowLeft={clickArrowLeft}
            clickReport={clickReport}
          />
          <CategoryList onClick={clickCategory} state={state} />
        </div>
        <div className="h-[48px]">
          <SortButtons clickText={clickText} sort={sort} />
        </div>
        {isEmpty ? (
          <EmptyAlert />
        ) : (
          <div className="overflow-auto">
            <div>
              <div className="mx-5 mt-5 pb-20">
                <SpendingList
                  formatTime={formatTime}
                  sort={sort}
                  formatDayTime={formatDayTime}
                  spendingList={spendingList}
                  newSelected={newSelected}
                />
              </div>
            </div>
          </div>
        )}
        <div className="fixed top-[690px] right-[20px]">
          <FaskMakeButton onClick={handleToggle} />
        </div>
      </div>
      <AddPostModal open={open} handleToggle={handleToggle} />
    </>
  )
}

export default HomePage
