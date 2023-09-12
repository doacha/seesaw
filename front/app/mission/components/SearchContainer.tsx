'use client'
import Capsule from '@/app/components/Capsule'
import SearchBar from './SearchBar'
import { categoryList } from '@/app/lib/constants'
import { useState } from 'react'
import styles from './SearchContainer.module.css'
const SearchContainer = () => {
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
      {/* 매일 2일에 한 번 */}
      <div className="mt-5">주기 및 기간</div>
      <div className="mt-2.5">
        <Capsule
          bgColor="background"
          textColor="black"
          // isHasBorder={true}
          className="mr-2.5"
        >
          미션 빈도
        </Capsule>
        <Capsule bgColor="bbackground" textColor="black" isHasBorder={true}>
          미션 횟수
        </Capsule>
      </div>
    </div>
  )
}

export default SearchContainer
