'use client'

import Button from '../components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronRight,
  faChevronLeft,
  faPoo,
} from '@fortawesome/free-solid-svg-icons'
import Capsule from '../components/Capsule'
import { categoryList } from '@/app/lib/constants'
import styles from './components/Home.module.css'
import { useState } from 'react'
import Card from '../components/Card'
import { categoryColors } from '@/app/lib/constants'

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
  // "2023-09-14T04:22:08.885Z",
  const now = new Date('2023-09-14T04:22:08.885Z') // 현재 날짜 및 시간
  const year = now.getFullYear() // 연도
  const month = now.getMonth()
  const day = now.getDate()
  const dayOfWeek = now.getDay()
  const WEEKDAY = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ]
  const week = WEEKDAY[now.getDay()]
  console.log(year, month, day, dayOfWeek, week)

  return (
    <div className="flex flex-col h-screen bg-background-fill">
      <div className="w-full h-44 bg-background">
        <div className="flex justify-between mx-5 mt-4">
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
              <p className="text-2xl font-envR">9월</p>
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
            <p className="text-3xl font-envR">600,000원</p>
          </div>
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
        <Card
          title={'30일 수요일'}
          content={
            // if works!
            <>
              <div className="h-9 mb-5 flex w-full flex-row gap-5">
                <div className="flex my-auto">
                  <FontAwesomeIcon
                    icon={faPoo}
                    style={{ color: '#5c3600' }}
                    size="xl"
                  />
                </div>
                <div className="flex w-full justify-between">
                  <div className="flex flex-col">
                    <span className="font-scDreamRegular text-sm">으아아</span>
                    <span className="font-scDreamRegular text-xs text-outline">
                      요일일거야
                    </span>
                  </div>
                  <div>
                    <p className="font-scDreamExBold text-xl">으아아아원</p>
                  </div>
                </div>
              </div>

              <div className="h-9 mb-5 flex w-full flex-row gap-5">
                <div className="flex my-auto">
                  <FontAwesomeIcon
                    icon={faPoo}
                    style={{ color: '#5c3600' }}
                    size="xl"
                  />
                </div>
                <div className="flex w-full justify-between">
                  <div className="flex flex-col">
                    <span className="font-scDreamRegular text-sm">으아아</span>
                    <span className="font-scDreamRegular text-xs text-outline">
                      요일일거야
                    </span>
                  </div>
                  <div>
                    <p className="font-scDreamExBold text-xl">으아아아원</p>
                  </div>
                </div>
              </div>

              <div className="h-9 mb-5 flex w-full flex-row gap-5">
                <div className="flex my-auto">
                  <FontAwesomeIcon
                    icon={faPoo}
                    style={{ color: '#5c3600' }}
                    size="xl"
                  />
                </div>
                <div className="flex w-full justify-between">
                  <div className="flex flex-col">
                    <span className="font-scDreamRegular text-sm">으아아</span>
                    <span className="font-scDreamRegular text-xs text-outline">
                      요일일거야
                    </span>
                  </div>
                  <div>
                    <p className="font-scDreamExBold text-xl">으아아아원</p>
                  </div>
                </div>
              </div>

              <div className="h-9 mb-5 flex w-full flex-row gap-5">
                <div className="flex my-auto">
                  <FontAwesomeIcon
                    icon={faPoo}
                    style={{ color: '#5c3600' }}
                    size="xl"
                  />
                </div>
                <div className="flex w-full justify-between">
                  <div className="flex flex-col">
                    <span className="font-scDreamRegular text-sm">으아아</span>
                    <span className="font-scDreamRegular text-xs text-outline">
                      요일일거야
                    </span>
                  </div>
                  <div>
                    <p className="font-scDreamExBold text-xl">으아아아원</p>
                  </div>
                </div>
              </div>

              <div className="h-9 mb-5 flex w-full flex-row gap-5">
                <div className="flex my-auto">
                  <FontAwesomeIcon
                    icon={faPoo}
                    style={{ color: '#5c3600' }}
                    size="xl"
                  />
                </div>
                <div className="flex w-full justify-between">
                  <div className="flex flex-col">
                    <span className="font-scDreamRegular text-sm">으아아</span>
                    <span className="font-scDreamRegular text-xs text-outline">
                      요일일거야
                    </span>
                  </div>
                  <div>
                    <p className="font-scDreamExBold text-xl">으아아아원</p>
                  </div>
                </div>
              </div>
            </>
          }
        />
      </div>
    </div>
  )
}

export default Home
