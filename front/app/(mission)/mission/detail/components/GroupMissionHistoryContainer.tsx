import { groupMissionHistory } from '../../dummys'
import GroupMissionHistoryCard from './GroupMissionHistoryCard'
const GroupMissionHistoryContainer = () => {
  return (
    <div className="rounded-lg bg-background p-5 m-5">
      <div className="font-scDreamMedium">미션 기록</div>
      <hr />
      {groupMissionHistory.groupMissionData.map((element, idx) => (
        <GroupMissionHistoryCard
          data={element}
          startDate={groupMissionHistory.startDate}
          key={idx}
        />
      ))}
    </div>
  )
}

export default GroupMissionHistoryContainer
