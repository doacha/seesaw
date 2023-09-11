'use client'

import { Mission } from '@/app/types'
import MyMissionInfoCard from './MyMissionInfoCard'
import Dropdown from '@/app/components/Dropdown'

const missionList: Mission[] = [
  {
    missionTitle: '술 그만마셔 그러다 뒤져',
    missionCycle: 1,
    missionImgUrl: './차차_군침이.jpg',
    missionPeriod: 10,
    missionStartDate: '2023-09-11',
    missionEndDate: '2023-09-30',
    missionResult: '진행중',
  },
  {
    missionTitle: '술 그만마셔 그러다 뒤져',
    missionCycle: 1,
    missionImgUrl: './차차_군침이.jpg',
    missionPeriod: 10,
    missionStartDate: '2023-09-11',
    missionEndDate: '2023-09-30',
    missionResult: '성공',
  },
  {
    missionTitle: '술 그만마셔 그러다 뒤져',
    missionCycle: 1,
    missionImgUrl: './차차_군침이.jpg',
    missionPeriod: 10,
    missionStartDate: '2023-09-11',
    missionEndDate: '2023-09-30',
    missionResult: '실패',
  },
]

const MyMissionListCard = () => {
  return (
    <div className="flex flex-col bg-white rounded-lg p-5 gap-2">
      <div className="flex w-full justify-between items-center">
        <div className="font-scDreamMedium text-lg">내 미션 목록</div>
        <div className="relative w-[80px] h-[40px]">
          <Dropdown />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {missionList.map((mission) => (
          <MyMissionInfoCard mission={mission} />
        ))}
      </div>
    </div>
  )
}

export default MyMissionListCard
