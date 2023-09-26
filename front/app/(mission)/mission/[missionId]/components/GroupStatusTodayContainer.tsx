import { todayMission } from '@/app/dummies'
import GroupStatusTodayCard from './GroupStatusTodayCard'
import { memberouter } from 'next/navigation'
const GroupStatusTodayContainer = () => {
  const router = memberouter()
  return (
    <div className=" rounded-lg bg-background px-5 pt-5 m-5">
      <div className="font-scDreamMedium">
        오늘의 미션 {`(${todayMission.missionCurrentCycle} 회)`}
      </div>
      <hr />
      <div className="carousel w-full overflow-scroll pt-5 pb-6">
        {todayMission.missionTodayList.map((element, idx) => (
          <GroupStatusTodayCard
            data={element}
            targetPrice={todayMission.missionTargetPrice}
            onClick={() => router.push('ndU1ZQjkV8/1')}
            key={idx}
          />
        ))}
      </div>
    </div>
  )
}

export default GroupStatusTodayContainer
