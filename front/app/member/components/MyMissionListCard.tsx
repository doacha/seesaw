'use client'

import { Mission, MissionCardProps } from '@/app/types'
import MyMissionInfoCard from './MyMissionInfoCard'
import Dropdown from '@/app/components/Dropdown'
import { missionList } from '@/app/dummies'
import { useState } from 'react'

interface Props {
  missionList: Mission[]
}

const MyMissionListCard = (props: Props) => {
  const [sortType, setSortType] = useState<0 | 1 | 2>(0)

  const onSortTypeChange = (value: 0 | 1 | 2) => {
    setSortType(value)
  }

  return (
    <div className="flex flex-col bg-white flex-grow rounded-lg p-5 gap-2">
      <div className="flex w-full justify-between items-center">
        <div className="font-scDreamMedium text-lg">내 미션 목록</div>
        <div className="relative w-[80px] h-[40px]">
          <Dropdown onSortTypeChange={onSortTypeChange} sortType={sortType} />
        </div>
      </div>
      <div className="flex flex-col gap-3 h-auto max-h-[480px] overflow-auto">
        {props.missionList.map((mission) =>
          sortType === 0 ? (
            <MyMissionInfoCard mission={mission} key={mission.missionId} />
          ) : sortType === mission.memberMissionStatus ? (
            <MyMissionInfoCard mission={mission} key={mission.missionId} />
          ) : null,
        )}
      </div>
    </div>
  )
}

export default MyMissionListCard
