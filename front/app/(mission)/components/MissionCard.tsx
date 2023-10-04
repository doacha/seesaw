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
  missionCategoryId: number
}
import Image from 'next/image'
import { missionCycleArray } from '@/app/lib/constants'
import Capsule from '@/app/components/Capsule'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPiggyBank, faFlag } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
const MissionCard = ({
  data,
  isStarted,
  category,
}: {
  data: MissionCardProps
  isStarted: boolean
  category: string
}) => {
  console.log('미션카드 데이터 체크', data)
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
            width={200}
            height={100}
            alt="mission Image"
            className="object-cover"
            style={{ height: '100px', objectFit: 'cover' }}
          />
          {!isStarted && (
            <div className="absolute top-3 left-3 bg-primary-container/80 rounded text-[10px] px-1 leading-[18px]">{`D - ${getDueDate(
              data.missionStartDate,
            )}`}</div>
          )}
          {/* 듀데이트 */}
          <div className="flex absolute top-3 right-3 bg-primary-container/80 rounded text-[10px] px-1 items-center leading-[18px]">
            <FontAwesomeIcon
              icon={faUser}
              size="xs"
              className="text-blue-600 mr-1 mt-1 mb-1"
            />
            {`${data.missionMemberCount}/${data.missionMaxCount}`}
          </div>
          {/* 제한인원 */}
        </figure>
        <div className="p-2.5">
          <div className="text-xs card-title mb-2.5">{data.missionTitle}</div>
          <div className="flex gap-2.5 mb-2.5">
            {/* 카테고리 */}
            <Capsule
              bgColor={`${data.missionCategoryId}`}
              textColor="background"
              isSmall={true}
              className="truncate"
            >
              {category}
            </Capsule>
            {/* target price */}
            <Capsule
              bgColor="background-fill"
              textColor="black"
              isSmall={true}
              className="truncate"
            >
              <span>
                <FontAwesomeIcon icon={faFlag} className="mr-2" />
                {data.missionTargetPrice.toLocaleString()}
              </span>
            </Capsule>
          </div>
          <div className="flex gap-2.5">
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
                  Math.ceil((data.missionPeriod * data.missionTotalCycle) / 7)
                ] ?? '더미'
              }`}
            </Capsule>
          </div>
        </div>
      </div>
    </Link>
  )
}

const SECOND = 1
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24

const getDueDate = (date: string) => {
  const start = new Date(date)
  const current = new Date()

  const passedSeconds = Math.trunc(
    (start.getTime() - current.getTime() - 9000 * HOUR) / 1000 + HOUR * 9,
  )
  return Math.trunc(passedSeconds / DAY)
}

export default MissionCard
