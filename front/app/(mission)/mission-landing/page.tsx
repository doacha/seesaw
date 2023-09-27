'use client'
import SearchContainerSimple from '../components/SearchContainerSimple'
import Header from '@/app/components/Header'
import type { SearchState } from '@/app/types'
import OngoingMissionList from './components/OngoingMissionList'
import Link from 'next/link'
import { Suspense } from 'react'
const MissionLandingPage = () => {
  const dummyState: SearchState = {
    inputText: '',
    category: -1,
    cycle: -1,
    period: -1,
  }

  return (
    <div className="bg-background-fill min-h-[840px]">
      <Header title="미션 목록" plusButton />
      <div className="py-16 pt-[74px] overflow-scroll flex flex-col gap-5 px-5">
        <Link href="/mission">
          <SearchContainerSimple onClick={() => {}} state={dummyState} />
        </Link>
        <Suspense fallback={<p>loading onGoingMission</p>}>
          <OngoingMissionList />
        </Suspense>
      </div>
    </div>
  )
}

export default MissionLandingPage
