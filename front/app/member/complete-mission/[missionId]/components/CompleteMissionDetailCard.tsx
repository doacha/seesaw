import { Mission } from '@/app/types'
import CompleteMissionImg from './CompleteMissionImg'
import Tab from '@/app/components/Tab'
import Capsule from '@/app/components/Capsule'
import CategoryList from '@/app/home/components/CategoryList'
import { categoryList } from '@/app/lib/constants'

interface Props {
  mission: Mission
}

const CompleteMissionDetailCard = (props: Props) => {
  let capsuleIndex: number
  if (props.mission.missionCategoryId !== undefined) {
    capsuleIndex = props.mission.missionCategoryId
  } else {
    capsuleIndex = 0
  }
  return (
    <div className="flex flex-col w-full bg-white">
      <CompleteMissionImg src={props.mission.missionImgUrl} />
      <div className="flex flex-col w-full p-5 gap-5">
        <div className="flex justify-between">
          <div>
            {props.mission.missionStartDate} ~ {props.mission.missionEndDate}
          </div>
          <div
            className={
              props.mission.memberMissionStatus === 2
                ? 'text-primary font-scDreamExBold'
                : props.mission.memberMissionStatus === 3
                ? 'text-error font-scDreamExBold'
                : ''
            }
          >
            {props.mission.memberMissionStatus === 1
              ? '진행중'
              : props.mission.memberMissionStatus === 2
              ? '성공'
              : '실패'}
          </div>
        </div>
        <div>{props.mission.missionPurpose}</div>

        <div className="flex gap-2 items-center">
          <Capsule
            bgColor={capsuleIndex.toString()}
            children={categoryList[capsuleIndex]}
            textColor={'background'}
          />
          <Capsule
            bgColor="background-fill"
            children={`${props.mission.missionPeriod}일 당 1회`}
            textColor="black"
          />
          <Capsule
            bgColor="background-fill"
            children={`${props.mission.missionTargetPrice?.toLocaleString()}원`}
            textColor="black"
          />
        </div>
      </div>
    </div>
  )
}

export default CompleteMissionDetailCard
