'use client'

import MissionCard from './components/MissionCard'
import { useState } from 'react'
import SearchBar from './components/SearchBar'
import SearchContainer from './components/SearchContainer'
import SearchContainerSimple from './components/SearchContainerSimple'
import { dummyMissionCard } from './components/dummy'
// mission detail
import { missionDetail } from './dummys'
import MissionDetailContainer from './detail/MissionDetailContainer'
import type { SearchState } from '@/app/types'
// todayMission
import TodayMissionContainer from './detail/TodayMissionContainer'
const page = () => {
  const [isSearchContainerFull, setIsSearchContainerFull] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState([])
  const [selectedSearchState, setSelectedSearchState] = useState<SearchState>({
    period: [],
    cycle: [],
    category: [],
  })
  console.log('selected 현황', selectedSearchState)
  const handleContainerExpand = () => {
    setIsSearchContainerFull(true)
  }
  const handleContainerShrink = () => {
    setIsSearchContainerFull(false)
  }
  return (
    <div className="bg-background-fill">
      <MissionDetailContainer data={missionDetail} />
      <TodayMissionContainer />
      {/* {!isSearchContainerFull && (
        <SearchContainerSimple
          state={selectedSearchState}
          onClick={handleContainerExpand}
        />
        // selected만 보내면 됨
      )}
      {isSearchContainerFull && (
        <SearchContainer
          state={selectedSearchState}
          setState={setSelectedSearchState}
          onClick={handleContainerShrink}
        />
        //set이랑 state 다 보내야함
      )}
      <div className="flex flex-wrap gap-5 mx-5">
        <MissionCard data={dummyMissionCard} />
        <MissionCard data={dummyMissionCard} />
        <MissionCard data={dummyMissionCard} />
        <MissionCard data={dummyMissionCard} />
        <MissionCard data={dummyMissionCard} />
      </div> */}
    </div>
  )
}

export default page
