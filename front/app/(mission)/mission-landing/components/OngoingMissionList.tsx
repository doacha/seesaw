import type { MissionCardProps } from '@/app/types'
import { missionCardDummy } from '@/app/dummies'
import MissionCard from '../../components/MissionCard'
const OngoingMissionList = ({ data }: { data: Array<MissionCardProps> }) => {
  // API 연결 후에는 key 수정해야 함
  return (
    <div className="">
      <div className="font-scDreamExBold mb-5 ">참여중인 미션</div>
      <div className="flex flex-wrap gap-5">
        {data.map((element, idx) => (
          <MissionCard data={element} key={idx} />
        ))}
      </div>
    </div>
  )
}

export default OngoingMissionList
