'use client'

import { MissionCardProps } from '@/app/types'
import MyMissionInfoCard from './MyMissionInfoCard'
import Dropdown from '@/app/components/Dropdown'

const missionList: MissionCardProps[] = [
  {
    missionId: '1',
    missionTitle: '술 그만마셔 그러다 뒤져',
    missionCycle: 1,
    missionImgUrl: './차차_군침이.jpg',
    missionPeriod: 10,
    missionStartDate: '2023-09-11',
    missionEndDate: '2023-09-30',
    missionResult: '진행중',
  },
  {
    missionId: '2',
    missionTitle: '술 그만마셔 그러다 뒤져',
    missionCycle: 1,
    missionImgUrl: './차차_군침이.jpg',
    missionPeriod: 10,
    missionStartDate: '2023-09-11',
    missionEndDate: '2023-09-30',
    missionResult: '성공',
  },
  {
    missionId: '3',
    missionTitle: '술 그만마셔 그러다 뒤져',
    missionCycle: 1,
    missionImgUrl: './차차_군침이.jpg',
    missionPeriod: 10,
    missionStartDate: '2023-09-11',
    missionEndDate: '2023-09-30',
    missionResult: '실패',
  },
  {
    missionId: '4',
    missionTitle: '술 그만마셔 그러다 뒤져',
    missionCycle: 1,
    missionImgUrl: './차차_군침이.jpg',
    missionPeriod: 10,
    missionStartDate: '2023-09-11',
    missionEndDate: '2023-09-30',
    missionResult: '진행중',
  },
  {
    missionId: '5',
    missionTitle: '술 그만마셔 그러다 뒤져',
    missionCycle: 1,
    missionImgUrl: './차차_군침이.jpg',
    missionPeriod: 10,
    missionStartDate: '2023-09-11',
    missionEndDate: '2023-09-30',
    missionResult: '진행중',
  },
  {
    missionId: '6',
    missionTitle: '술 그만마셔 그러다 뒤져',
    missionCycle: 1,
    missionImgUrl: './차차_군침이.jpg',
    missionPeriod: 10,
    missionStartDate: '2023-09-11',
    missionEndDate: '2023-09-30',
    missionResult: '진행중',
  },
]

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
