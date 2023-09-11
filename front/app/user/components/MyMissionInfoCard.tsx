import { Mission } from '@/app/types'
import MyMissionDetailInfo from './MyMissionDetailInfo'

interface Props {
  mission: Mission
}

const MyMissionInfoCard = (props: Props) => {
  return (
    <div className="bg-background-fill rounded-lg p-2">
      <MyMissionDetailInfo mission={props.mission} />
    </div>
  )
}

export default MyMissionInfoCard
