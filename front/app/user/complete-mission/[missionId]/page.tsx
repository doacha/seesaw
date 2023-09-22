'use client'

import { Mission, MissionCardProps, Record } from '@/app/types'
import CompleteMissionDetailCard from './components/CompleteMissionDetailCard'
import Header from '@/app/components/Header'
import Tab from '@/app/components/Tab'
import { useState } from 'react'
import MystatisticCard from './components/MyStatisticCard'
import GroupStatisticCard from './components/GroupStatisticCard'
import Card from '@/app/components/Card'
import RecordCard from './components/RecordCard'
import { recordList, mission } from '@/app/dummies'

const CompleteMissionPage = ({ params }: { params: { missionId: string } }) => {
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

export default CompleteMissionPage
