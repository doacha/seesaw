import Header from '@/app/components/Header'
import MissionDetailContainer from './components/MissionDetailContainer'
import { mission, missionDetailDummy } from '@/app/dummies'
import MissionDetailContents from './components/MissionDetailContents'
import MissionWaitingList from './components/MissionWaitingList'
import FaskMakeButton from '@/app/components/FastMakeButton'
import CategoryList from '@/app/home/components/CategoryList'
import MissionJoinButton from './components/MissionJoinButton'
import { categoryList } from '@/app/lib/constants'
import { MissionDetail } from '@/app/types'

interface MemberCard {
  memberNickname: string
  memberImgUrl: string
}

const getMissionDetailFetch = async (missionId: string) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/mission/detail/${missionId}`,
  ).then((res) => {
    return res.json()
  })
}
const getMissionWaitListFetch = async (missionId: string) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/mission/members/${missionId}`,
  ).then((res) => {
    return res.json()
  })
}
// API 연결 이후 params를 통해 데이터를 가져와야 한다.
const MissionDetailpage = async ({ params }: { params: any }) => {
  const data = (await getMissionDetailFetch(params.missionId)) as MissionDetail
  let missionWaitList
  if (data.missionStatus === 0) {
    missionWaitList = (await getMissionWaitListFetch(
      params.missionId,
    )) as MemberCard[]
  }
  data.missionImgUrl = '/차차_군침이.jpg'
  const contentsProps = {
    missionId: params.missionId,
    missionPeriod: data.missionPeriod,
    missionTargetPrice: data.missionTargetPrice,
    missionStartDate: data.missionStartDate,
    missionCurrentCycle: data.missionCurrentCycle,
    missionDeposit: data.missionDeposit,
  }
  data.missionIsPublic = false
  const isStart = true
  return (
    <div className="bg-background-fill h-full overflow-auto py-16">
      {/* <Header title={data.missionTitle} backButton /> */}
      <MissionDetailContainer data={data} />
      {data.missionStatus !== 0 ? (
        <>
          <MissionDetailContents data={contentsProps} />
          <FaskMakeButton path={`${data.missionId}/create`} />
        </>
      ) : (
        <>
          <MissionWaitingList data={missionWaitList} />
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
