import { Mission } from '@/app/types'
import MyMissionDetailInfo from './MyMissionDetailInfo'
import { useRouter } from 'next/navigation'
import { currentTabStore } from '@/stores/currentTab'

interface Props {
  mission: Mission
}

const MyMissionInfoCard = (props: Props) => {
  const { setCurrentTab } = currentTabStore()
  const router = useRouter()

  const onClickMyMissionInfoCard = () => {
    if (
      props.mission.missionStatus === 1 ||
      props.mission.missionStatus === 0
    ) {
      setCurrentTab('mission')
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
