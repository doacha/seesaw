import GroupStatusTodayContainer from './GroupStatusTodayContainer'
import GroupMissionHistoryContainer from './GroupMissionHistoryContainer'
const GroupStatus = ({
  data,
}: {
  data: {
    missionPeriod: number
    missionTargetPrice: number
    missionStartDate: string
    missionCurrentCycle: number
    missionDeposit: number
  }
}) => {
  return (
    <div>
      <GroupStatusTodayContainer />
      <GroupMissionHistoryContainer />
    </div>
  )
}

export default GroupStatus
