'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
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

const HomePage = () => {
  const router = useRouter()
  const { memberEmail, setMemberEmail } = memberEmailStore()
  const { checkUpdateDelete, setCheckUpdateDelete } = UpdateDeleteCheckStore()

  const [sort, setSort] = useState('최신순')
  const [spendData, setSpendData] = useState<Spending>({
    // email은 zustand에 들어있는 걸로 가져와야 함
    memberEmail: 'tldnjs324@naver.com',
    spendingYear: new Date().getFullYear(),
    spendingMonth: new Date().getMonth() + 1,
    condition: 'spendingDate', // 초기값은 'spendingDate'로 설정
  })
  const [spendingList, setSpendingList] = useState<Spending[]>([])

  // 화살표 클릭 감지
  const [clickEvent, setClickEvent] = useState<boolean>(false)
  // zustand에 저장된 email 가져오기
  // console.log(memberEmail)

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
      if (res.status === 200) {
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
        if (
          data.length === 0 &&
          spendData.spendingMonth !== new Date().getMonth() + 1
        ) {
          Swal.fire({
            width: 300,
            text: '저장된 데이터가 없습니다!',
            icon: 'error',
          })
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
        } // 저장된 데이터가 있다면 spendingList에 내용 추가
        else {
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

  // Todo.. 이해하기... 왜 머리가 안돌아 가니이이이이
  const categoryInit = Array(21).fill(false)
  categoryInit[0] = true // 0은 true로 변경
  // category 선택 여부 판단 boolean 배열
  const [state, setState] = useState<boolean[]>(categoryInit)
  // 미분류 포함하면 총 21개, id와 isSelected는 어디서 가져오는 거야?
  const clickCategory = (id: number, isSelected: boolean) => {
    // 기존 state 배열 가져와
    const newState = [...state]
    if (id === 0 && !isSelected) {
      // 전체 카테고리가 선택된 경우, 이외 카테고리 해제
      newState.fill(false)
      newState[0] = true
    } else {
      // 개별 카테고리가 이미 선택되어있으면 선택 해제, 선택 안되어있으면 선택
      newState[id] = !isSelected
      // "전체" 카테고리 선택 해제
      newState[0] = false
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

  // addPostModal을 열었는지 확인하는 boolean 변수
  const handleToggle = () => {
    setOpen((prev) => !prev)
  }

  // monthTotalSum을 계산하기 위한 state 변수
  const [monthTotalSum, setMonthTotalSum] = useState<number>(0)

  useEffect(() => {
    fetchRefresh()
  }, [spendData, clickEvent, open, sort, checkUpdateDelete])

  return (
    <>
      <div className="flex flex-col h-screen bg-background-fill">
        <div className="w-full h-44 bg-background">
          <HomeHeader
            spend={spendData}
            spendSum={monthTotalSum}
            // 화살표 누름?
            clickEvent={clickEvent}
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
              // 이건 사용자에게 보여질 날짜 데이터 처리
              formatTime={formatTime}
              // 최신순 고액순
              sort={sort}
              // 사용자에게 보여질 날짜 데이터 처리
              formatDayTime={formatDayTime}
              // 소비 내역 전체 리스트
              spendingList={spendingList}
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
