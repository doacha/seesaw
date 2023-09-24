'use client'

interface MissionCardProps {
  missionId: string
  missionTitle: string
  missionMemberCount: number
  missionMaxCount: number
  missionImgUrl: string
  missionPurpose: string
  missionMinDeposit: number
  missionIsPublic: boolean
  missionLimit: number
  missionPeriod: number
  missionCycle: number
  missionStartDate: string
  missionCreationTime: string
  missionHostEmail: string
  categoryId: number
}

import { dummyMissionCard } from './dummy'
import Capsule from '@/app/components/Capsule'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const MissionCard = ({ data }: { data: MissionCardProps }) => {
  return (
    <div className="card w-[calc(50%-10px)] min-w-[165px] h-[184px] bg-base-100 shadow-md rounded-lg">
      <figure className="relative h-25">
        <img
          src={dummyMissionCard.missionImgUrl}
          alt="mission Image"
          className="object-cover"
        />
        <div className="absolute top-3 left-3 bg-primary-container/80 rounded text-[10px] px-1">{`D - ${getDueDate(
          dummyMissionCard.missionStartDate,
        )}`}</div>
        {/* 듀데이트 */}
        <div className="flex absolute top-3 right-3 bg-primary-container/80 rounded text-[10px] px-1">
          <FontAwesomeIcon
            icon={faUser}
            size="xs"
            className="text-primary mr-1 mt-1 mb-1"
          />
          {`${dummyMissionCard.missionMemberCount}/${dummyMissionCard.missionMaxCount}`}
        </div>
        {/* 제한인원 */}
      </figure>
      <div className="p-2.5 h-[84px]">
        <div className="text-xs card-title mb-2.5">
          {dummyMissionCard.missionTitle}
        </div>
        <div className="flex gap-2.5 mb-2.5">
          <Capsule
            bgColor="bg-background-fill"
            textColor="text-black"
            isSmall={true}
            content={`${dummyMissionCard.missionPeriod}일당 하루`}/
          >
          <Capsule
            bgColor="bg-background-fill"
            textColor="text-black"
            isSmall={true}
            content={`${dummyMissionCard.missionCycle}회`}
          />
        </div>
        <div className="text-[10px] text-outline mb-2.5">{`${dummyMissionCard.missionLimit.toLocaleString(
          'ko-KR',
        )} 원`}</div>
      </div>
    </div>
  )
}

const getDueDate = (date: string) => {
  const start = new Date(date)
  const current = new Date()
  return start.getDate() - current.getDate()
}

export default MissionCard
