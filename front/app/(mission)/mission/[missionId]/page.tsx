'use client'

import Header from '@/app/components/Header'
import MissionDetailContainer from './components/MissionDetailContainer'
import { mission, missionDetailDummy } from '@/app/dummies'
import MissionDetailContents from './components/MissionDetailContents'
import MissionWaitingList from './components/MissionWaitingList'
import Tab from '@/app/components/Tab'
import FaskMakeButton from '@/app/components/FastMakeButton'
import { useRouter } from 'next/navigation'
// API 연결 이후 params를 통해 데이터를 가져와야 한다.
const MissionDetailpage = () => {
  const router = useRouter()
  const data = missionDetailDummy
  const contentsProps = {
    missionPeriod: 7,
    missionTargetPrice: 50000,
    missionStartDate: '2023-09-14',
    missionCurrentCycle: 4,
    missionDeposit: 30000,
  }
  const isStart = true
  return (
    <div className="bg-background-fill">
      {/* <Header title={data.missionTitle} backButton /> */}
      <MissionDetailContainer data={data} />
      {isStart ? (
        <MissionDetailContents data={contentsProps} />
      ) : (
        <MissionWaitingList />
      )}
      <FaskMakeButton onClick={() => router.push('ndU1ZQjkV8/create')} />
    </div>
  )
}

export default MissionDetailpage
