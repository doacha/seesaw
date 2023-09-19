import { todayMission } from '../../dummys'
import TodayMissionCard from './TodayMissionCard'
const TodayMissionContainer = () => {
  return (
    <div className=" rounded-lg bg-background px-5 pt-5 m-5">
      <div>오늘의 미션 {`${todayMission.missionCurrentCycle} 회`}</div>
      <hr />
      <div className="carousel w-full overflow-scroll pt-5 pb-6">
        {todayMission.missionTodayList.map((element, idx) => (
          <TodayMissionCard
            data={element}
            targetPrice={todayMission.missionTargetPrice}
            onClick={() => {}}
          />
        ))}
      </div>
    </div>
  )
}

export default TodayMissionContainer
