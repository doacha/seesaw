'use client'

interface MissionCardProps {
  missionId: string
  missionTitle: string
  missionMemberCount: number
  missionMaxCount: number
  missionImgUrl: string
  missionTargetPrice: number
  missionPeriod: number
  missionTotalCycle: number
  missionStartDate: string
}
import { missionCardDummy as dummyMissionCard } from '@/app/dummies'
import { missionCycleArray } from '@/app/lib/constants'
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
          src={data.missionImgUrl}
          alt="mission Image"
          className="object-cover"
        />
        <div className="absolute top-3 left-3 bg-primary-container/80 rounded text-[10px] px-1">{`D - ${getDueDate(
          data.missionStartDate,
        )}`}</div>
        {/* 듀데이트 */}
        <div className="flex absolute top-3 right-3 bg-primary-container/80 rounded text-[10px] px-1">
          <FontAwesomeIcon
            icon={faUser}
            size="xs"
            className="text-primary mr-1 mt-1 mb-1"
          />
          {`${data.missionMemberCount}/${data.missionMaxCount}`}
        </div>
        {/* 제한인원 */}
      </figure>
      <div className="p-2.5 h-[84px] bg-background">
        <div className="text-xs card-title mb-2.5">{data.missionTitle}</div>
        <div className="flex gap-2.5 mb-2.5">
          <Capsule bgColor="background-fill" textColor="black" isSmall={true}>
            {`${data.missionPeriod}일당 하루`}
          </Capsule>
          <Capsule bgColor="background-fill" textColor="black" isSmall={true}>
            {`${
              missionCycleArray[
                (data.missionPeriod * data.missionTotalCycle) / 7
              ] ?? ''
            }`}
          </Capsule>
        </div>
        <div className="text-[10px] text-outline mb-2.5">
          {data.missionTargetPrice &&
            `${data.missionTargetPrice.toLocaleString()} 원`}
        </div>
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
