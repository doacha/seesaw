import Image from 'next/image'
import Capsule from '@/app/components/Capsule'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMoneyBillWave,
  faCalendarCheck,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import {
  categoryList,
  missionCycleArray,
  missionPeriodArray,
} from '@/app/lib/constants'
import type { MissionDetail } from '@/app/types'
const MissionDetailContainer = ({ data }: { data: MissionDetail }) => {
  const totalTerm = (data.missionPeriod * data.missionTotalCycle) / 7 + 1
  return (
    <div className="mt-[50px] bg-background">
      <div className="w-full h-[210px] overflow-hidden relative">
        <Image
          src={`${data.missionImgUrl}`}
          alt="미션 대표 이미지"
          width={390}
          height={390}
          sizes="100%"
          className="absolute top-[-50%]"
        />
      </div>
      <div className="px-5 py-[15px]">
        {/* 타이틀 */}
        <div className="flex justify-between mb-2.5">
          <div className="text-base font-scDreamExBold">
            {data.missionTitle}
          </div>
          <div className="text-sm">
            <FontAwesomeIcon icon={faUser} className="text-primary mr-2" />
            {`${data.missionMemberCount} / ${data.missionMaxCount}`}
          </div>
        </div>
        {/* 내용 */}
        <div className="text-sm mb-[15px] h-[70px]">{data.missionPurpose}</div>
        {/* 카테고리 */}
        <Capsule
          bgColor={`${data.missionCategoryId}`}
          textColor="background"
          className="mb-2.5"
        >
          {`${categoryList[data.missionCategoryId]}`}
        </Capsule>
        {/* 금액 */}
        <div className="mb-2.5">
          <FontAwesomeIcon icon={faMoneyBillWave} className="mr-[15px]" />
          {`${data.missionTargetPrice}`}
        </div>
        {/* 일정 */}
        <div className="mb-2.5 flex gap-[15px] items-center">
          <FontAwesomeIcon icon={faCalendarCheck} />
          <Capsule bgColor="background-fill" textColor="black">{`${
            missionPeriodArray[data.missionPeriod - 1]
          }`}</Capsule>
          <Capsule bgColor="background-fill" textColor="black">
            {missionCycleArray[totalTerm] ?? ''}
          </Capsule>
          <span className="text-outline text-xs">{`(${data.missionTotalCycle} 회)`}</span>
        </div>
        {/* 실패 한도 */}
        <div className="mb-2.5">{`실패 한도 : ${data.missionFailureCount}회`}</div>
      </div>
    </div>
  )
}

export default MissionDetailContainer
