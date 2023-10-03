import MyDepositStatusContainer from './MyDepositStatusContainer'
import MySavingMoney from './MySavingMoney'
import MyMissionHistoryContainer from './MyMissionHistoryContainer'
import { GroupStatusProps } from '@/app/types'
const MyStatus = ({
  data,
  recordHistory,
}: {
  data: GroupStatusProps
  recordHistory: Array<any>[]
}) => {
  return (
    <>
      <MyDepositStatusContainer propsData={data} />
      <MySavingMoney propsData={data} />
      <MyMissionHistoryContainer propsData={data} data={recordHistory} />
    </>
  )
}

export default MyStatus
