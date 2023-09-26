'use client'
import Capsule from '@/app/components/Capsule'
import SearchBar from '@/app/(mission)/components/SearchBar'
import {
  categoryList,
  missionPeriodArray,
  missionCycleArray,
} from '@/app/lib/constants'
import { memberef, useState } from 'react'
import Button from '@/app/components/Button'
import styles from './SearchContainer.module.css'
import { faAnglesUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ToggleCapsule from '@/app/components/ToggleCapsule'
import DropdownCapsule from '@/app/(mission)/components/DropdownCapsule'
import type { SearchState } from '@/app/types'
const SearchContainer = ({
  onClick,
  handleCapsule,
  state,
}: {
  onClick: any
  handleCapsule: any
  state: SearchState
}) => {
  const [periodDropDownOn, setPeriodDropDownOn] = useState(false)
  const [cycleDropDownOn, setCycleDropDownOn] = useState(false)
  // console.log('test etet', state['category'].includes(0), state)
  const periodRef = memberef(null)
  const handleOpenPeriod = () => {
    setPeriodDropDownOn(true)
  }
  const handleOpenCycle = () => {
    setCycleDropDownOn(true)
  }
  const handleDropDownOff = () => {
    setPeriodDropDownOn(false)
    setCycleDropDownOn(false)
  }
  const handlePeriodClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <div className="rounded-lg bg-background px-5 py-2.5 w-full">
      <SearchBar />
      <div className="mt-5">카테고리</div>
      <div className={`mt-2.5 overflow-scroll ${styles.delScroll}`}>
        <div className="carousel">
          {categoryList.map((element, idx) => (
            <ToggleCapsule
              className="carousel-item mr-[15px] h-[14px] py-0"
              bgColor="background-fill"
              textColor={`${idx}`}
              key={idx}
              isSelected={state['category'][idx]}
              onClick={() =>
                handleCapsule(idx, state['category'][idx], 'category')
              }
            >
              {element}
            </ToggleCapsule>
          ))}
        </div>
      </div>
      <div className="mt-5">주기 및 기간</div>
      <div className="mt-2.5 relative">
        <DropdownCapsule
          className="mr-2.5"
          onClick={handleOpenPeriod}
          state={state.period}
          title="인증 주기"
          type={1}
        />

        <DropdownCapsule
          onClick={handleOpenCycle}
          state={state.cycle}
          title="미션 기간"
          type={2}
        />
        <span onClick={onClick}>
          <FontAwesomeIcon
            icon={faAnglesUp}
            className="absolute top-[5px] right-0"
          />
        </span>
      </div>
      {periodDropDownOn && (
        <div
          className="w-full h-screen fixed bg-black/30 left-0 z-10 bottom-16 open:transition-transform"
          onClick={handleDropDownOff}
        >
          <div
            className="absolute bottom-0 w-full bg-background  rounded-t-lg p-5"
            ref={periodRef}
            onClick={handlePeriodClick}
          >
            <div className="mb-5 w-full">인증 주기</div>
            <div className="w-full">
              {missionPeriodArray.map(
                (element, idx) =>
                  element && (
                    <ToggleCapsule
                      bgColor="background-fill"
                      textColor="black"
                      className="mr-[15px] mb-[15px]"
                      key={idx}
                      isSelected={state['period'][idx]}
                      onClick={() =>
                        handleCapsule(idx, state['period'][idx], 'period')
                      }
                    >
                      {element}
                    </ToggleCapsule>
                  ),
              )}
              <Button
                color="primary"
                label="확인"
                onClick={handleDropDownOff}
                size="xs"
              />
            </div>
          </div>
        </div>
      )}
      {cycleDropDownOn && (
        <div
          className="w-full h-screen fixed bg-black/30 left-0 z-10 bottom-16 open:transition-transform"
          onClick={handleDropDownOff}
        >
          <div
            className="absolute bottom-0 w-full bg-background  rounded-t-lg p-5"
            ref={periodRef}
            onClick={handlePeriodClick}
          >
            <div className="mb-5 w-full">미션 기간</div>
            <div className="w-full">
              {missionCycleArray.map(
                (element, idx) =>
                  element && (
                    <ToggleCapsule
                      bgColor="background-fill"
                      textColor="black"
                      className="mr-[15px] mb-[15px]"
                      key={idx}
                      isSelected={state['cycle'][idx]}
                      onClick={() =>
                        handleCapsule(idx, state['cycle'][idx], 'cycle')
                      }
                    >
                      {element}
                    </ToggleCapsule>
                  ),
              )}
              <Button
                color="primary"
                label="확인"
                onClick={handleDropDownOff}
                size="xs"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchContainer
