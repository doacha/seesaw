'use client'

import GroupStatusTodayContainer from './GroupStatusTodayContainer'
import GroupMissionHistoryContainer from './GroupMissionHistoryContainer'
import { GroupStatusProps } from '@/app/types'
const GroupStatus = ({ data }: { data: GroupStatusProps }) => {
  return (
    <div>
      <GroupStatusTodayContainer data={data} />
      <GroupMissionHistoryContainer data={data} />
    </div>
  )
}

export default GroupStatus
