'use client'

import { Mission, MissionCardProps } from '@/app/types'
import MyMissionInfoCard from './MyMissionInfoCard'
import Dropdown from '@/app/components/Dropdown'
import { useState } from 'react'
import MissionEmptyAlert from './MissionEmptyAlert'

interface Props {
  missionList: Mission[]
}

const MyMissionListCard = (props: Props) => {
  const [sortType, setSortType] = useState<1 | 2 | 3>(1)

  const onSortTypeChange = (value: 1 | 2 | 3) => {
    setSortType(value)
  }

  return (
    <div className="flex flex-col bg-background flex-grow rounded-lg p-5 gap-2 h-[400px]">
      <div className="flex w-full justify-between items-center">
        <div className="font-scDreamMedium text-lg">내 미션 목록</div>
        <div className="relative w-[80px] h-[40px]">
          <Dropdown onSortTypeChange={onSortTypeChange} sortType={sortType} />
        </div>
      </div>
      <div className="flex flex-col gap-3 h-auto max-h-[480px] overflow-auto">
        {props.missionList.length > 0 ? (
          props.missionList.map((mission) =>
            sortType === 1 ? (
              <MyMissionInfoCard mission={mission} key={mission.missionId} />
            ) : sortType === mission.memberMissionStatus ? (
              <MyMissionInfoCard mission={mission} key={mission.missionId} />
            ) : null,
          )
        ) : (
          <MissionEmptyAlert />
        )}
      </div>
    </div>
  )
}

export default MyMissionListCard
