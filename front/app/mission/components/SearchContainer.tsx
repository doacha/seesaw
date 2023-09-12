'use client'
import Capsule from '@/app/components/Capsule'
import SearchBar from './SearchBar'
import { categoryList, missionPeriodArray } from '@/app/lib/constants'
import { useRef, useState } from 'react'
import styles from './SearchContainer.module.css'
const SearchContainer = () => {
  const [periodModalOn, setPeriodModalOn] = useState(false)
  const periodRef = useRef(null)
  const handleClick = () => {
    setPeriodModalOn(true)
  }
  const handleModalOff = () => {
    setPeriodModalOn(false)
  }
  const handlePeriodClick = (e: React.MouseEvent) => {
    console.log(e)
    e.stopPropagation()
  }
  return (
    <div className="rounded-lg bg-background px-5 py-2.5 w-full">
      <SearchBar />
      <div className="mt-5">카테고리</div>
      <div className={`mt-2.5 overflow-scroll ${styles.delScroll}`}>
        <div className="carousel">
          {categoryList.map((element, idx) => (
            <Capsule
              className="carousel-item mr-[15px] h-[14px]"
              bgColor="background-fill"
              textColor={`${idx}`}
              key={idx}
              changeable={true}
            >
              {element}
            </Capsule>
          ))}
        </div>
      </div>
      <div className="mt-5">주기 및 기간</div>
      <div className="mt-2.5">
        <span onClick={handleClick}>
          <Capsule
            bgColor="background"
            textColor="black"
            isHasBorder={true}
            className="mr-2.5"
            onClick={handleClick}
          >
            미션 빈도
          </Capsule>
        </span>
        <Capsule bgColor="background" textColor="black" isHasBorder={true}>
          미션 횟수
        </Capsule>
      </div>
      {periodModalOn && (
        <div
          className="w-full h-screen fixed bg-black/30 left-0 z-10 bottom-16"
          onClick={handleModalOff}
        >
          <div
            className="absolute bottom-0 w-full bg-background  rounded-t-lg p-5"
            ref={periodRef}
            onClick={handlePeriodClick}
          >
            <div className="mb-5 w-full">미션 빈도</div>
            <div className="w-full">
              {missionPeriodArray.map((element, idx) => {
                if (idx === 0) return
                return (
                  <Capsule
                    bgColor="background"
                    textColor="black"
                    isHasBorder={true}
                    className="m-[7.5px]"
                    changeable={true}
                    onClick={() => {
                      console.log(idx)
                    }}
                  >
                    {element}
                  </Capsule>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchContainer
