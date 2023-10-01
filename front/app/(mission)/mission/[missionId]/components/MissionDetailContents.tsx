'use client'
import Tab from '@/app/components/Tab'
import { useState } from 'react'
import GroupStatus from './GroupStatus'
import MyStatus from './MyStatus'
import { GroupStatusProps } from '@/app/types'
import { recordListStore } from '@/stores/myRecordList'
const MissionDetailContents = ({ data }: { data: GroupStatusProps }) => {
  const [activeTab, setActiveTab] = useState('tab1')
  const { recordStatus, setRecordStatus } = recordListStore()
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }
  if (recordStatus.missionId !== data.missionId) {
    setRecordStatus({
      missionId: data.missionId,
      missionPeriod: data.missionPeriod,
      missionStartDate: data.missionStartDate,
      missionTargetPrice: data.missionTargetPrice,
      pageNumber: 0,
    })
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
