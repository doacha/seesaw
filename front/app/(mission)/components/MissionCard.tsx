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

import { missionCardDummy as dummyMissionCard } from '@/app/dummies'
import Capsule from '@/app/components/Capsule'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation'
const MissionCard = ({ data }: { data: MissionCardProps }) => {
  const router = useRouter()
  return (
    <div
      onClick={() => router.push('/mission/' + data.missionId)}
      className="card w-[calc(50%-10px)] min-w-[165px] h-[184px] shadow-md rounded-lg bg-backgroun"
    >
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
      <div className="p-2.5 h-[84px] bg-background">
        <div className="text-xs card-title mb-2.5">
          {dummyMissionCard.missionTitle}
        </div>
        <div className="flex gap-2.5 mb-2.5">
          <Capsule
            bgColor="background-fill"
            textColor="black"
            isSmall={true}
            content={`${dummyMissionCard.missionPeriod}일당 하루`}/
          >
          <Capsule
            bgColor="background-fill"
            textColor="black"
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
