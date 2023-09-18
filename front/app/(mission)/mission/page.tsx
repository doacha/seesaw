'use client'

import MissionCard from './components/MissionCard'
import { useState } from 'react'
import SearchBar from './components/SearchBar'
import SearchContainer from './components/SearchContainer'
import SearchContainerSimple from './components/SearchContainerSimple'
import { dummyMissionCard } from './components/dummy'
// mission detail
import { missionDetail } from './dummys'
import MissionDetailContainer from './detail/components/MissionDetailContainer'
import type { SearchState } from '@/app/types'
// todayMission
import TodayMissionContainer from './detail/components/TodayMissionContainer'
// groupMissionHistory
import GroupMissionHistoryContainer from './detail/components/GroupMissionHistoryContainer'
// myMissionHistory
import MyMissionHistoryContainer from './detail/components/MyMissionHistoryContainer'
// BoardContentContainer
import BoardContentContainer from '../board/[boardId]/components/BoardContentContainer'
import BoardCommentsContainer from '../board/[boardId]/components/BoardCommentsContainer'
import CommentInput from '../board/[boardId]/components/CommentInput'
import DepositStatusContainer from './detail/components/DepositeStatusContainer'
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
      <DepositStatusContainer />
      {/* <MissionDetailContainer data={missionDetail} /> */}
      {/* <TodayMissionContainer /> */}
      {/* <GroupMissionHistoryContainer /> */}
      {/* <MyMissionHistoryContainer /> */}

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
