import { Mission } from '@/app/types'
import MissionBackgroundImg from './MissionBackgroundImg'

interface Props {
  mission: Mission
}

const MyMissionDetailInfo = (props: Props) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2">
        <MissionBackgroundImg src={props.mission.missionImgUrl} />
        <div className="flex flex-col justify-center">
          <div className="text-base font-scDreamMedium">
            {props.mission.missionTitle}
          </div>
          <div className="text-outline text-xs">
            {props.mission.missionStartDate}~{props.mission.missionEndDate}
          </div>
        </div>
      </div>
      <div
        className={
          props.mission.missionStatus === 2
            ? 'text-primary'
            : props.mission.missionStatus === 3
            ? 'text-error'
            : ''
        }
      >
        {props.mission.missionStatus === 2
          ? '성공'
          : props.mission.missionStatus === 3
          ? '실패'
          : '진행중'}
      </div>
    </div>
  )
}

export default MyMissionDetailInfo
