'use client'

import Button from '../components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons'
import Capsule from '../components/Capsule'
import { categoryList } from '@/app/lib/constants'
import styles from './components/Home.module.css'
import { useState } from 'react'
import Card from '../components/Card'
import FaskMakeButton from '../components/FastMakeButton'
import { Spending } from '@/app/types'

import { useRouter } from 'next/navigation'

import { categoryColors } from '@/app/lib/constants'
import { iconColors } from '@/app/lib/constants'
import { categoryIcon } from '@/app/lib/constants'

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
    spendingCategoryId: 2,
    memberEmail: 'doacha@seesaw.com',
  },
  {
    spendingId: 4,
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
    spendingCategoryId: 0,
    memberEmail: 'doacha@seesaw.com',
  },
]
const Home = () => {
  const [sort, setSort] = useState('최신순')
  const clickReport = () => {
    console.log('소비리포트 클릭')
  }
  const clickArrow = () => {
    console.log('arrow 클릭')
  }
  const clickText = (e: any) => {
    console.log('텍버 클릭')
    setSort(e.target.innerText)
  }
  const router = useRouter()

  const clickDetail = () => {
    // 해당 내역의 번호를 가지고 페이지 이동해야해
    router.push('/home/detail')
  }

  // "2023-09-14T04:22:08.885Z",
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

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
    }

    const formatter = new Intl.DateTimeFormat('ko-KR', options)
    return formatter.format(date)
  }

  // Todo.. card에 같은 날짜 같은 요일인 경우 하나의 카드에 정보가 나타나야 한다

  // const now = new Date('2023-09-14T04:22:08.885Z') // 현재 날짜 및 시간
  // const year = now.getFullYear() // 연도
  // const month = now.getMonth()
  // const day = now.getDate()
  // const dayOfWeek = now.getDay()
  // const WEEKDAY = [
  //   '일요일',
  //   '월요일',
  //   '화요일',
  //   '수요일',
  //   '목요일',
  //   '금요일',
  //   '토요일',
  // ]
  // const week = WEEKDAY[now.getDay()]
  // // console.log(year, month, day, dayOfWeek, week)

  const clickPlus = (e: any) => {
    console.log('플버 클릭')
  }

  return (
    <div className="flex flex-col h-screen bg-background-fill">
      <div className="w-full h-44 bg-background">
        <div className="flex justify-between mx-5 mt-4">
          {spend.map((spending, key) => (
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
                <p className="text-2xl font-envR">{spending.spendingMonth}월</p>
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
          ))}
          <div className="mx-2 my-auto flex-col">
            <div className="mb-2">
              <Button
                color="primary"
                label="소비 예측"
                onClick={clickReport}
                size="xl"
              />
            </div>
            <Button
              color="secondary"
              label="소비리포트"
              onClick={clickReport}
              size="xl"
            />
          </div>
        </div>
        <div className="ml-3">
          <div className={`mt-3 overflow-scroll ${styles.delScroll}`}>
            <div className="carousel">
              {categoryList.map((element, idx) => (
                <Capsule
                  className="carousel-item mr-[15px] h-[14px]"
                  bgColor="background-fill"
                  textColor={`${idx}`}
                  key={idx}
                >
                  {element}
                </Capsule>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between h-12 border-t-2 border-outline-container bg-background">
        <div className="mx-2 my-auto">
          <label className="label cursor-pointer">
            <input
              type="checkbox"
              className="w-6 h-6 border-2-outline rounded focus:ring-3 focus:ring-sky-500"
              // checked
            />
            <span className="pl-1 label-text text-lg text-zinc-700">
              메모 있음
            </span>
          </label>
        </div>
        <div className="flex justify-between gap-1 mx-2">
          <button
            className={
              sort === '최신순'
                ? 'font-scDreamMedium text-primary'
                : 'font-scDreamRegular text-outline-container'
            }
            onClick={clickText}
          >
            최신순
          </button>
          <p className=" text-gray-200 my-auto"> | </p>
          <button
            className={
              sort === '고액순'
                ? 'font-scDreamMedium text-primary'
                : 'font-scDreamRegular text-outline-container'
            }
            onClick={clickText}
          >
            고액순
          </button>
        </div>
      </div>
      <div className="mx-5 my-5">
        {sort === '최신순' ? (
          <>
            {spendingList.map((spending, idx) => (
              <div className="mb-2">
                <Card
                  title={
                    (spending.spendingDate &&
                      formatDay(new Date(spending.spendingDate))) ||
                    ''
                  }
                  content={
                    // if works!
                    // 현재 Card의 formatDay와 spending.spendingDate가 같아야 하나의 card에 나와야 하는데 그게 안된다..
                    <>
                      <div
                        onClick={clickDetail}
                        className="h-9 mb-5 flex w-full flex-row gap-5"
                      >
                        <div className="flex my-auto ml-2">
                          {spending.spendingCategoryId && (
                            <FontAwesomeIcon
                              icon={categoryIcon[spending.spendingCategoryId]}
                              style={{
                                color: iconColors[spending.spendingCategoryId],
                              }}
                              size="xl"
                            />
                          )}
                        </div>
                        <div className="flex w-full justify-between">
                          <div className="flex flex-col">
                            <span className="font-scDreamRegular text-sm">
                              {spending.spendingTitle}
                            </span>
                            <span className="font-scDreamRegular text-xs text-outline">
                              {spending.spendingDate &&
                                formatTime(new Date(spending.spendingDate))}
                            </span>
                          </div>
                          <div>
                            <p className="font-scDreamExBold text-sm">
                              {spending.spendingCost &&
                                spending.spendingCost.toLocaleString('ko-KR')}
                              원
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  }
                />
              </div>
            ))}
          </>
        ) : (
          <div className="w-full h-fit rounded-lg bg-background">
            <div className="p-5">
              {spendingList.map((spending, idx) => (
                <div className="h-9 flex w-full flex-row gap-5 mb-3">
                  <div className="flex my-auto ml-2">
                    {spending.spendingCategoryId && (
                      <FontAwesomeIcon
                        icon={categoryIcon[spending.spendingCategoryId]}
                        style={{
                          color: iconColors[spending.spendingCategoryId],
                        }}
                        size="xl"
                      />
                    )}
                  </div>
                  <div className="flex w-full justify-between">
                    <div className="flex flex-col">
                      <span className="font-scDreamRegular text-sm">
                        {spending.spendingTitle}
                      </span>
                      <span className="font-scDreamRegular text-xs text-outline">
                        {spending.spendingDate &&
                          formatDayTime(new Date(spending.spendingDate))}
                      </span>
                    </div>
                    <div>
                      <p className="font-scDreamExBold text-xl">
                        {spending.spendingCost &&
                          spending.spendingCost.toLocaleString('ko-KR')}
                        원
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="fixed top-[690px] right-[20px]">
        <FaskMakeButton onClick={clickPlus} />
      </div>
    </div>
  )
}

export default Home
