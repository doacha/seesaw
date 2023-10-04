import { Mission } from '@/app/types'
import MyMissionDetailInfo from './MyMissionDetailInfo'
import { useRouter } from 'next/navigation'

interface Props {
  mission: Mission
}

const MyMissionInfoCard = (props: Props) => {
  const router = useRouter()

  const onClickMyMissionInfoCard = () => {
    if (props.mission.memberMissionStatus === 0) {
      router.push(`mission/${props.mission.missionId}`)
    } else {
      router.push(`member/complete-mission/${props.mission.missionId}`)
    }
  }

  return (
    <div
      className="bg-background-fill rounded-lg p-2"
      onClick={onClickMyMissionInfoCard}
    >
      <MyMissionDetailInfo mission={props.mission} />
    </div>
  )
}

export default MyMissionInfoCard
