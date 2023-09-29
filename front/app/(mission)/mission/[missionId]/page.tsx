import Header from '@/app/components/Header'
import MissionDetailContainer from './components/MissionDetailContainer'
import { mission, missionDetailDummy } from '@/app/dummies'
import MissionDetailContents from './components/MissionDetailContents'
import MissionWaitingList from './components/MissionWaitingList'
import FaskMakeButton from '@/app/components/FastMakeButton'
import CategoryList from '@/app/home/components/CategoryList'
import MissionJoinButton from './components/MissionJoinButton'
import { categoryList } from '@/app/lib/constants'
// API 연결 이후 params를 통해 데이터를 가져와야 한다.
const MissionDetailpage = () => {
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
      {data.missionStatus !== 0 ? (
        <>
          <MissionDetailContents data={contentsProps} />
          ß <FaskMakeButton path="ndU1ZQjkV8/create" />
        </>
      ) : (
        <>
          <MissionWaitingList />
          <MissionJoinButton
            isSaveMission
            missionCategory={categoryList[data.missionCategoryId]}
          />
        </>
      )}
    </div>
  )
}

export default MissionDetailpage
