import MyDepositStatusContainer from './MyDepositStatusContainer'
import MySavingMoney from './MySavingMoney'
import MyMissionHistoryContainer from './MyMissionHistoryContainer'
import { GroupStatusProps } from '@/app/types'
const MyStatus = ({ data }: { data: GroupStatusProps }) => {
  return (
    <>
      {/* <MyDepositStatusContainer propsData={data} />
      <MySavingMoney propsData={data} /> */}
      <MyMissionHistoryContainer propsData={data} />
    </>
  )
}

export default MyStatus
