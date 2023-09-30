import MyDepositStatusContainer from './MyDepositStatusContainer'
import MySavingMoney from './MySavingMoney'
import MyMissionHistoryContainer from './MyMissionHistoryContainer'
const MyStatus = ({
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
    <>
      <MyDepositStatusContainer />
      <MySavingMoney />
      <MyMissionHistoryContainer />
    </>
  )
}

export default MyStatus
