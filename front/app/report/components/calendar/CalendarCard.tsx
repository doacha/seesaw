'use client'

import { useState, useEffect } from 'react'
import Calendar from 'react-calendar' // react-calendar 라이브러리
import moment from 'moment-timezone' // 날짜 데이터 관리
import '../../styles/calendar.css' // calendar 전체 style

import { Spending } from '@/app/types'
import Loading from '@/app/components/Loading'
import EmptyAlert from '../EmptyAlert'
import FaskMakeButton from '@/app/components/FastMakeButton'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { iconColors } from '@/app/lib/constants'
import { categoryIcon } from '@/app/lib/constants'

import { QueryKey, useQuery } from '@tanstack/react-query'
import AddPostModal from '@/app/home/components/AddPostModal'

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]
type Props = {
  spendData: Spending
}
const CalendarCard = ({ spendData }: Props) => {
  const [value, setValue] = useState<Value>(
    new Date(
      spendData.spendingYear as number,
      (spendData.spendingMonth as number) - 1,
      1,
    ),
  )
  // 모달 오픈?
  const [isOpen, setIsOpen] = useState<boolean>(false)
  // 클릭한 날짜
  const [clickDate, setClickDate] = useState('')

  // 데이터 없는걸 처리하기 위한 변수
  const [isEmpty, setIsEmpty] = useState<boolean>(false)

  const [open, setOpen] = useState(false)

  const handleDoubleToggle = () => {
    setOpen((prev) => !prev)
  }

  const [spendingList, setSpendingList] = useState<Spending[]>([])

  const formatDay = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
    }

    const formatter = new Intl.DateTimeFormat('ko-KR', options)
    return formatter.format(date)
  }

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

  useEffect(() => {
    setValue(
      new Date(
        spendData.spendingYear as number,
        (spendData.spendingMonth as number) - 1,
        1,
      ),
    )
    fetchSpendList()
  }, [spendData])

  const [showDate, setShowDate] = useState<string>('')
  const onChange = (date: any) => {
    setIsOpen((prev) => !prev)
    const formattedDate = moment(date).format('D일')
    setClickDate(formattedDate)
    setShowDate(moment(date).format('M월 D일'))
  }
  const fetchDailySumList = async (spendData: Spending) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/spending/dailysum`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(spendData),
      },
    )
    return await res.json()
  }

  const fetchSpendList = () => {
    fetch(`${process.env.NEXT_PUBLIC_SEESAW_API_URL}/spending/list`, {
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
        if (data.length === 0) {
          setIsEmpty(true)
        } else {
          setIsEmpty(false)
          setSpendingList(data)
          let sum = 0
          data.forEach((element: any) => {
            sum += element.spendingCost as number
          })
        }
      })
  }

  const groupedSpending = groupSpendingByDay(spendingList)
  let totalSpendingCost = 0

  useEffect(() => {
    const keys = Object.keys(groupedSpending)

    if (keys.includes(clickDate)) {
      keys.forEach((element) => {
        setIsEmpty(false)
        if (element === clickDate) {
          //console.log(groupedSpending[clickDate])///
          for (let i = 0; i < groupedSpending[clickDate].length; i++) {
            totalSpendingCost += groupedSpending[clickDate][i]
              .spendingCost as number
            //console.log(groupedSpending[clickDate][i].spendingCost)
          }
        }
      })
    } else {
      setIsEmpty(true)
    }
  }, [clickDate, isOpen])

  const {
    isLoading,
    data: sumList,
    error,
  } = useQuery(['sumList', spendData], () => fetchDailySumList(spendData))

  const mark =
    sumList &&
    sumList.map((element: Spending, idx: number) => {
      const formattedDate = moment
        .utc(element.spendingDate)
        .tz('Asia/Seoul')
        .format('YYYY-MM-DD')
      return formattedDate
    })

  const consumption =
    sumList &&
    sumList.map((element: Spending, idx: number) => element.spendingCostSum)

  let modalClass = 'modal modal-bottom sm:modal-middle'

  if (isOpen) {
    modalClass += ' modal-open'
  }
  const handleToggle = () => {
    setIsOpen((prev) => !prev)
  }
  const formatTime = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
    }
    const formatter = new Intl.DateTimeFormat('ko-KR', options)
    return formatter.format(date)
  }

  const handleModalClickOutside = (e: any) => {
    if (e.target.classList.contains('modal-open')) {
      setIsOpen(false)
    }
  }
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Calendar
          calendarType="gregory" // 요일은 일요일부터 시작
          onChange={onChange} // useState로 포커스 변경 시 현재 날짜 받아오기
          formatDay={(locale, date) => moment(date).format('DD')} // 날'일' 제외하고 숫자만 보이도록 설정
          value={value}
          minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
          maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
          showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
          className="flex justify-center items-center w-full text-sm shadow-lg"
          showNavigation={false} // navigation 보여줘? 아니 보여주지 마
          tileContent={({ date, view }) => {
            // 날짜 타일에 컨텐츠 추가하기 (html 태그)
            // 추가할 html 태그를 변수 초기화
            let html = []

            // 현재 날짜에 해당하는 money 값을 가져옴
            const moneyIndex = mark.findIndex(
              (x: any) => x === moment(date).format('YYYY-MM-DD'),
            )
            if (moneyIndex !== -1) {
              html.push(
                consumption[moneyIndex] === 0 ? (
                  <span
                    key={moneyIndex}
                    className="font-scDreamRegula text-xs mx-auto text-yellow-500"
                  >
                    무지출
                  </span>
                ) : (
                  <span
                    key={moneyIndex}
                    className="font-scDreamRegula text-xs text-outline"
                  >
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
      )}
      <div className={modalClass} onClick={handleModalClickOutside}>
        <div className="modal-box h-[380px] bg-white">
          <div className="flex flex-row justify-between">
            <h3 className="font-bold text-lg font-scDreamRegular">
              {showDate}
            </h3>
          </div>
          <div className="h-[1px] bg-outline rounded-full mt-2"></div>
          <>
            {isEmpty ? (
              <EmptyAlert />
            ) : (
              <>
                {Object.entries(groupedSpending).map(([day, data]) => (
                  <div key={day}>
                    {clickDate === day && (
                      <div className="my-3 overflow-auto" key={day}>
                        <>
                          {data.map((spending, key) => (
                            <div
                              key={spending.spendingId}
                              className="h-9 mb-3 flex w-full flex-row gap-5"
                            >
                              <div className="flex my-auto w-6 ml-1">
                                {spending.spendingCategoryId && (
                                  <FontAwesomeIcon
                                    icon={
                                      categoryIcon[spending.spendingCategoryId]
                                    }
                                    style={{
                                      color:
                                        iconColors[spending.spendingCategoryId],
                                    }}
                                    size="xl"
                                  />
                                )}
                              </div>
                              <div className="flex w-full justify-between">
                                <div className="flex flex-col">
                                  <span className=" overflow-hidden font-scDreamRegular text-xs ">
                                    {spending.spendingTitle}
                                  </span>
                                  <span className="font-scDreamRegular text-xs text-outline">
                                    {spending.spendingDate &&
                                      formatTime(
                                        new Date(spending.spendingDate),
                                      )}
                                  </span>
                                </div>
                                <div>
                                  <p className=" whitespace-nowrap font-scDreamExBold text-sm">
                                    {spending.spendingCost &&
                                      spending.spendingCost.toLocaleString(
                                        'ko-KR',
                                      )}
                                    원
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </>
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}
          </>
        </div>
        <div className="fixed top-[800px] right-[30px]">
          <FaskMakeButton onClick={handleDoubleToggle} path="/report" />
        </div>
      </div>
      <AddPostModal open={open} handleToggle={handleDoubleToggle} />
    </>
  )
}

export default CalendarCard
