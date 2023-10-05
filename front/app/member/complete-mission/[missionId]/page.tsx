'use client'

import { Mission, MissionCardProps, Record } from '@/app/types'
import CompleteMissionDetailCard from './components/CompleteMissionDetailCard'
import Header from '@/app/components/Header'
import Tab from '@/app/components/Tab'
import { useEffect, useState } from 'react'
import MystatisticCard from './components/MyStatisticCard'
import GroupStatisticCard from './components/GroupStatisticCard'
import Card from '@/app/components/Card'
import RecordCard from './components/RecordCard'
import { useQuery } from '@tanstack/react-query'
import { memberEmailStore } from '@/stores/memberEmail'
import Loading from '@/app/components/Loading'
import { currentMissionIdStore } from '@/stores/currentMissionId'

const CompleteMissionPage = ({ params }: { params: { missionId: string } }) => {
  const [activeTab, setActiveTab] = useState<string>('tab1')
  const { memberEmail } = memberEmailStore()
  const { setCurrentMissionId } = currentMissionIdStore()
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const getCompleteMissionDetailInfo = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/mission/endinfo`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            memberEmail: memberEmail,
            missionId: params.missionId,
          }),
        },
      )
      const data = await res.json()
      return data
    } catch (err) {
      console.log(err)
    }
  }

  const getRecordList = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/record/enddetail`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            memberEmail: memberEmail,
            missionId: params.missionId,
          }),
        },
      )
      const data = await res.json()
      console.log(data)
      return data
    } catch (err) {
      console.log(err)
    }
  }

  const {
    isLoading,
    data: mission,
    error,
  } = useQuery(['completeMissionDetailInfo'], getCompleteMissionDetailInfo)
  const { data: recordList } = useQuery(['recordList'], getRecordList)

  useEffect(() => {
    setCurrentMissionId(params.missionId)
  }, [])

  return (
    <div className="w-screen h-screen bg-background-fill">
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <Header title={mission.missionTitle} backButton />

          <div className="h-screen py-16 overflow-auto ">
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
                  content={recordList.map((record: Record, index: number) => (
                    <RecordCard record={record} key={index} />
                  ))}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CompleteMissionPage
