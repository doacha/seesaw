'use client'
import { missionCardDummy } from '@/app/dummies'
import SearchContainerSimple from '../components/SearchContainerSimple'
import SearchContainer from './components/SearchContainer'
import Header from '@/app/components/Header'
import type { SearchState } from '@/app/types'
import MissionCard from '../components/MissionCard'
import { useState } from 'react'
import { MissionCardProps } from '@/app/types'
import { useRouter } from 'next/navigation'
const MissionPage = () => {
  const [isActiveSearch, setIsActiveSearch] = useState(true)
  const [searchResult, setSearchResult] = useState<Array<MissionCardProps>>()
  const [searchState, setSearchState] = useState<SearchState>({
    category: Array(20).fill(false),
    cycle: Array(8).fill(false),
    period: Array(13).fill(false),
  })
  const router = useRouter()

  const handleActiveSearch = () => {
    setIsActiveSearch(true)
  }

  const handleDeactiveSearch = () => {
    setIsActiveSearch(false)
  }
  const handleCapsuleClick = (
    idx: number,
    isSelected: boolean,
    type: string,
  ) => {
    const newState = [...searchState[type]]
    newState[idx] = !isSelected
    newState[0] = false
    if (idx === 0 && !isSelected) {
      newState.fill(false)
      newState[0] = true
    }
    setSearchState({ ...searchState, [type]: newState })
  }
  // API 연결 후 더미 삭제
  const searchedMissionList = Array(6).fill(missionCardDummy)

  return (
    <div className="bg-background-fill">
      <Header title="미션 목록" plusButton backButton />
      <div className="py-16 pt-[74px] overflow-scroll flex flex-col gap-5 px-5">
        {isActiveSearch && (
          <SearchContainer
            onClick={handleDeactiveSearch}
            handleCapsule={handleCapsuleClick}
            state={searchState}
          />
        )}
        {!isActiveSearch && (
          <SearchContainerSimple
            onClick={handleActiveSearch}
            state={searchState}
          />
        )}
        <div className="flex flex-wrap gap-5">
          {searchedMissionList.map((element, idx) => (
            <MissionCard data={element} key={idx} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MissionPage
