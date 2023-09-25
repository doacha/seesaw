'use client'
import { missionCardDummy } from '@/app/dummies'
import SearchContainerSimple from '../components/SearchContainerSimple'
import Header from '@/app/components/Header'
import type { SearchState } from '@/app/types'
import OngoingMissionList from './components/OngoingMissionList'
import RecommendMissionList from './components/RecommendMissionList'
import Link from 'next/link'
const MissionLandingPage = () => {
  const dummyState: SearchState = {
    category: [],
    cycle: [],
    period: [],
  }
  const onGoingMissionList = Array(4).fill(missionCardDummy)
  const recommendMissionList = Array(4).fill(missionCardDummy)
  return (
    <div className="bg-background-fill">
      <Header title="미션 목록" plusButton />
      <div className="py-16 pt-[74px] overflow-scroll flex flex-col gap-5 px-5">
        <Link href="/mission">
          <SearchContainerSimple onClick={() => {}} state={dummyState} />
        </Link>
        <OngoingMissionList data={onGoingMissionList} />
        <RecommendMissionList data={recommendMissionList} />
      </div>
    </div>
  )
}

export default MissionLandingPage
