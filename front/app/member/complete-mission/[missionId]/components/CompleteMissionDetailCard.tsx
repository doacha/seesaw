import { Mission } from '@/app/types'
import CompleteMissionImg from './CompleteMissionImg'
import Tab from '@/app/components/Tab'

interface Props {
  mission: Mission
}

const CompleteMissionDetailCard = (props: Props) => {
  return (
    <div className="flex flex-col w-full bg-white">
      <CompleteMissionImg src={props.mission.missionImgUrl} />
      <div className="flex flex-col w-full p-5 gap-5">
        <div className="flex justify-between">
          <div>
            {props.mission.missionStartDate}~{props.mission.missionEndDate}
          </div>
          <div
            className={
              props.mission.memberMissionStatus === 1
                ? 'text-primary font-scDreamExBold'
                : props.mission.memberMissionStatus === 2
                ? 'text-error font-scDreamExBold'
                : ''
            }
          >
            {props.mission.memberMissionStatus === 0
              ? '진행중'
              : props.mission.memberMissionStatus === 1
              ? '성공'
              : '실패'}
          </div>
        </div>
        <div>{props.mission.missionPurpose}</div>
        <div></div>
      </div>
    </div>
  )
}

export default CompleteMissionDetailCard
