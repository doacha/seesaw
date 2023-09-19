import { MissingStaticPage } from 'next/dist/shared/lib/utils'
import StatusBar from './StatusBar'
import PersonalCard from './PersonalCard'
import { getCycleTerm } from '../../../util'

interface missionResult {
  userImgUrl: string
  userName: string
  status: boolean
  spending: number
  boardId: number
}

interface groupMissionHistoryProps {
  cycleCount: number
  successCount: number
  failCount: number
  missionPeriod: number
  individualResult: Array<missionResult>
}

const GroupMissionHistoryCard = ({
  data,
  startDate,
}: {
  data: groupMissionHistoryProps
  startDate: string
}) => {
  return (
    <div className="rounded-lg p-2.5 my-2.5 border shadow-md">
      {/* 회차 타이틀 */}
      <div>
        <span className="font-scDreamMedium mr-2.5">
          {data.cycleCount} 회차
        </span>
        <span className="text-[10px] text-outline">{`${getCycleTerm(
          startDate,
          data.cycleCount,
          data.missionPeriod,
        )}`}</span>
      </div>
      {/* 현황 바 */}
      <StatusBar success={data.successCount} fail={data.failCount} />
      {/* 개인별 결과 */}
      {data.individualResult.map((element, idx) => (
        <PersonalCard data={element} key={idx} />
      ))}
    </div>
  )
}

export default GroupMissionHistoryCard
