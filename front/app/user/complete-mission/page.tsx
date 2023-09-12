'use client'

import { Mission } from '@/app/types'
import CompleteMissionDetailCard from './components/CompleteMissionDetailCard'
import Header from '@/app/components/Header'
import Tab from '@/app/components/Tab'
import { useState } from 'react'
import MystatisticCard from './components/MyStatisticCard'

const mission: Mission = {
  missionTitle: '술 그만마셔 그러다 뒤져',
  missionCycle: 1,
  missionImgUrl: '../차차_군침이.jpg',
  missionPeriod: 10,
  missionStartDate: '2023-09-11',
  missionEndDate: '2023-09-30',
  missionResult: '성공',
  missionPurpose: '잠와 죽을 거 같아 신한 해커톤 싫어요 크아아아악.',
}

const CompleteMission = () => {
  const [activeTab, setActiveTab] = useState<string>('tab1')

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  return (
    <div className="w-screen h-screen bg-background-fill">
      <Header title={mission.missionTitle} backButton route="/user" />

      <div className="h-full pb-16">
        <CompleteMissionDetailCard mission={mission} />
        <Tab
          labels={['통계', '내 게시글']}
          activeTab={activeTab}
          handleTabChange={handleTabChange}
        ></Tab>
        <div className="p-5">
          {activeTab === 'tab1' ? <MystatisticCard /> : null}
        </div>
      </div>
    </div>
  )
}

export default CompleteMission
