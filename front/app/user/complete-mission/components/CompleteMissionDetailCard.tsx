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
              props.mission.missionResult === '성공'
                ? 'text-primary font-scDreamExBold'
                : props.mission.missionResult === '실패'
                ? 'text-error font-scDreamExBold'
                : ''
            }
          >
            {props.mission.missionResult}
          </div>
        </div>
        <div>{props.mission.missionPurpose}</div>
        <div></div>
      </div>
    </div>
  )
}

export default CompleteMissionDetailCard
