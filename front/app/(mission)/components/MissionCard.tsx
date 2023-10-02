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
import Image from 'next/image'
import { missionCycleArray } from '@/app/lib/constants'
import Capsule from '@/app/components/Capsule'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
const MissionCard = ({ data }: { data: MissionCardProps }) => {
  // console.log('미션카드 데이터 체크', data)
  return (
    <Link
      href={`/mission/${data.missionId}`}
      className="w-[calc(50%-10px)] min-w-[140px]"
    >
      <div className="card min-w-[140px] h-[184px] shadow-md rounded-lg bg-background">
        <figure className="relative h-25">
          <Image
            src={
              data.missionImgUrl === 'string'
                ? '/default_profile.svg'
                : data.missionImgUrl
            }
            width={100}
            height={100}
            alt="mission Image"
            className="object-cover"
            style={{ width: 'calc(100%)', objectFit: 'cover' }}
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
        <div className="p-2.5 h-[84px]">
          <div className="text-xs card-title mb-2.5">{data.missionTitle}</div>
          <div className="flex gap-2.5 mb-2.5">
            <Capsule
              bgColor="background-fill"
              textColor="black"
              isSmall={true}
              className="truncate"
            >
              {`${data.missionPeriod}일당 하루`}
            </Capsule>
            <Capsule
              bgColor="background-fill"
              textColor="black"
              isSmall={true}
              className="truncate"
            >
              {`${
                missionCycleArray[
                  (data.missionPeriod * data.missionTotalCycle) / 7
                ] ?? '더미'
              }`}
            </Capsule>
          </div>
          <div className="text-[10px] text-outline mb-2.5">
            {data.missionTargetPrice &&
              `${data.missionTargetPrice.toLocaleString()} 원`}
          </div>
        </div>
      </div>
    </Link>
  )
}

const getDueDate = (date: string) => {
  const start = new Date(date)
  const current = new Date()
  return start.getDate() - current.getDate()
}

export default MissionCard
