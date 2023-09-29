'use client'
import Tab from '@/app/components/Tab'
import { useState } from 'react'
import GroupStatus from './GroupStatus'
import MyStatus from './MyStatus'
import { GroupStatusProps } from '@/app/types'
const MissionDetailContents = ({ data }: { data: GroupStatusProps }) => {
  const [activeTab, setActiveTab] = useState('tab1')
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }
  return (
    <div className="">
      <Tab
        labels={['그룹 현황', '내 현황']}
        activeTab={activeTab}
        handleTabChange={handleTabChange}
      />
      {activeTab === 'tab1' ? (
        <GroupStatus data={data} />
      ) : (
        <MyStatus data={data} />
      )}
    </div>
  )
}

export default MissionDetailContents
