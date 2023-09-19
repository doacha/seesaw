'use client'

import { MissionCardProps, Record } from '@/app/types'
import CompleteMissionDetailCard from './components/CompleteMissionDetailCard'
import Header from '@/app/components/Header'
import Tab from '@/app/components/Tab'
import { useState } from 'react'
import MystatisticCard from './components/MyStatisticCard'
import GroupStatisticCard from './components/GroupStatisticCard'
import Card from '@/app/components/Card'
import RecordCard from './components/RecordCard'

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

const recordList: Record[] = [
  {
    memberEmail: 'jjwoong1733@gmail.com',
    missionId: '1',
    recordContent: '커피 끊자 너무 많이 마신다.',
    recordId: 1,
    recordNumber: 1,
    recordStatus: 0,
    recordTotalCost: 30000,
    recordWriteTime: '2023-09-13',
  },
  {
    memberEmail: 'jjwoong1733@gmail.com',
    missionId: '1',
    recordContent: '커피 끊자 너무 많이 마신다.',
    recordId: 1,
    recordNumber: 2,
    recordStatus: 1,
    recordTotalCost: 30000,
    recordWriteTime: '2023-09-13',
  },
  {
    memberEmail: 'jjwoong1733@gmail.com',
    missionId: '1',
    recordContent: '커피 끊자 너무 많이 마신다.',
    recordId: 1,
    recordNumber: 3,
    recordStatus: 2,
    recordTotalCost: 30000,
    recordWriteTime: '2023-09-13',
  },
]

const CompleteMission = () => {
  const [activeTab, setActiveTab] = useState<string>('tab1')

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  return (
    <div className="w-screen h-screen bg-background-fill">
      <Header title={mission.missionTitle} backButton route="/user" />

      <div className="h-full py-16 overflow-auto ">
        <CompleteMissionDetailCard mission={mission} />
        <Tab
          labels={['통계', '내 기록']}
          activeTab={activeTab}
          handleTabChange={handleTabChange}
        ></Tab>

        {activeTab === 'tab1' ? (
          <div className="flex flex-col p-5 gap-5">
            <MystatisticCard />
            <GroupStatisticCard />
          </div>
        ) : (
          <div className="flex flex-col p-5 gap-5">
            <Card
              content={recordList.map((record) => (
                <RecordCard record={record} />
              ))}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default CompleteMission
