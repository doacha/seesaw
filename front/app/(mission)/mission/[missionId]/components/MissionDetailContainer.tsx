import Image from 'next/image'
import Capsule from '@/app/components/Capsule'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMoneyBillWave,
  faCalendarCheck,
  faUser,
  faFlag,
  faLock,
  faArrowUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons'
import {
  categoryList,
  missionCycleArray,
  missionPeriodArray,
} from '@/app/lib/constants'
import type { MissionDetail } from '@/app/types'
import CopyToClipboardButton from './CopyToClipboardButton'

const MissionDetailContainer = ({ data }: { data: MissionDetail }) => {
  const totalTerm = Math.ceil((data.missionPeriod * data.missionTotalCycle) / 7)

  return (
    <div className=" bg-background">
      <div className="w-full h-[210px] overflow-hidden relative">
        <Image
          src={`${data.missionImgUrl ?? '/default_mission.svg'}`}
          alt="미션 대표 이미지"
          width={390}
          height={390}
          sizes="100%"
          className="w-screen"
        />
      </div>
      <div className="px-5 py-[15px]">
        {/* 타이틀 */}
        <div className="flex justify-between mb-2.5">
          <div className="text-base font-scDreamExBold">
            {data.missionTitle}
          </div>
          <div className="text-sm">
            {/* 백에서는 1이 public이라 반전시켜줌 */}
            {!data.missionIsPublic && (
              <FontAwesomeIcon icon={faLock} className="text-red-700 mr-2" />
            )}
            <FontAwesomeIcon icon={faUser} className="text-primary mr-2" />
            {`${data.missionMemberCount} / ${data.missionMaxCount}`}
          </div>
        </div>
        {/* 내용 */}
        <div className="text-sm mb-[15px] h-[70px]">{data.missionPurpose}</div>
        {/* 카테고리 */}
        <div className="flex flex-row gap-[15px] mb-[15px]">
          <Capsule
            bgColor={`${data.missionCategoryId}`}
            textColor="background"
          >{`${categoryList[data.missionCategoryId]}`}</Capsule>
          <Capsule bgColor="background-fill" textColor="black">
            <span className="tooltip tooltip-background" data-tip="목표 금액">
              <FontAwesomeIcon icon={faFlag} className="mr-2.5" />
              {`${data.missionTargetPrice.toLocaleString()}`}
            </span>
          </Capsule>
          <Capsule bgColor="background-fill" textColor="black">
            <span className="tooltip tooltip-background" data-tip="예치금">
              <FontAwesomeIcon icon={faMoneyBillWave} className="mr-2.5" />
              {`${data.missionDeposit.toLocaleString()}`}
            </span>
          </Capsule>
        </div>
        {/* 일정 */}
        <div className="mb-2.5 flex gap-[15px] items-center">
          <Capsule bgColor="background-fill" textColor="black">
            {missionPeriodArray[data.missionPeriod] ?? ''}
          </Capsule>
          <Capsule bgColor="background-fill" textColor="black">
            {missionCycleArray[totalTerm] ?? ' '}
          </Capsule>
          <span className="text-outline text-xs">{`(${data.missionTotalCycle}회)`}</span>
        </div>
        {/* 실패 한도 */}
        <div className="mb-2.5 flex flex-row justify-between items-center">
          <div>{`실패 한도 : ${Math.trunc(data.missionTotalCycle / 5)}회`}</div>
          {!data.missionIsPublic && data.missionStatus === 0 && (
            <CopyToClipboardButton url={data.missionId} />
          )}
        </div>
      </div>
    </div>
  )
}

export default MissionDetailContainer
