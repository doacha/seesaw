import { myMissionHistory } from '../../dummys'
import MyMissionHistoryCard from './MyMissionHistoryCard'
interface CycleResult {
  cycleCount: number
  spendingRecord: Array<{ recordName: string; recordPrice: number }>
}

const MyMissionHistoryContainer = ({}) => {
  return (
    <div className="bg-background p-5 rounded-lg mx-5">
      <div className="font-scDreamMedium">미션 기록</div>
      <hr />
      {myMissionHistory.cycleResult.map((element, idx) => (
        <MyMissionHistoryCard
          data={element}
          startDate={myMissionHistory.startDate}
          missionPeriod={myMissionHistory.missionPeriod}
          missionTargetPrice={myMissionHistory.missionTargetPrice}
          key={idx}
        />
      ))}
    </div>
  )
}

export default MyMissionHistoryContainer
