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
  console.log(props.mission)
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

        <div>
          <Capsule
            bgColor={capsuleIndex.toString()}
            children={categoryList[capsuleIndex]}
            textColor={'background'}
          />
        </div>
      </div>
    </div>
  )
}

export default CompleteMissionDetailCard
