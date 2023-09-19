'use client'

import { MissionCardProps } from '@/app/types'
import MyMissionInfoCard from './MyMissionInfoCard'
import Dropdown from '@/app/components/Dropdown'
import { missionList } from '@/app/dummies'

const MyMissionListCard = () => {
  return (
    <div className="flex flex-col bg-white flex-grow rounded-lg p-5 gap-2">
      <div className="flex w-full justify-between items-center">
        <div className="font-scDreamMedium text-lg">내 미션 목록</div>
        <div className="relative w-[80px] h-[40px]">
          <Dropdown />
        </div>
      </div>
      <div className="flex flex-col gap-3 h-auto max-h-[480px] overflow-auto">
        {missionList.map((mission) => (
          <MyMissionInfoCard mission={mission} key={mission.missionId} />
        ))}
      </div>
    </div>
  )
}

export default MyMissionListCard
