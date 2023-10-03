import Header from '@/app/components/Header'
import MissionDetailContainer from './components/MissionDetailContainer'
import { mission, missionDetailDummy } from '@/app/dummies'
import MissionDetailContents from './components/MissionDetailContents'
import MissionWaitingList from './components/MissionWaitingList'
import CategoryList from '@/app/home/components/CategoryList'
import MissionJoinButton from './components/MissionJoinButton'
import { categoryList } from '@/app/lib/constants'
import { MissionDetail } from '@/app/types'
import UpdateRecordButton from './components/UpdateRecordButton'
import MissionExitButton from './components/MissionExitButton'
const MISSION_WAIT = 0
const MISSION_START = 1
const DUMMY_NICKNAME = '도아차는나야123'

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
  let missionWaitList,
    isJoined = false
  if (data.missionStatus === 0) {
    missionWaitList = (await getMissionWaitListFetch(
      params.missionId,
    )) as MemberCard[]
    isJoined = missionWaitList.some(
      (element) => element.memberNickname === DUMMY_NICKNAME,
    )
  }
  // data.missionImgUrl = '/차차_군침이.jpg'
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
      <MissionDetailContainer data={data} />
      {data.missionStatus === MISSION_START ? (
        <>
          <MissionDetailContents data={contentsProps} />
          <UpdateRecordButton />
        </>
      ) : (
        <>
          <MissionWaitingList data={missionWaitList} />
          {isJoined ? (
            <MissionExitButton missionId={data.missionId} />
          ) : (
            <MissionJoinButton
              isSaveMission
              missionCategory={categoryList[data.missionCategoryId]}
              missionTargetPrice={data.missionTargetPrice}
              missionCategoryId={data.missionCategoryId}
              missionPeriod={data.missionPeriod}
            />
          )}
        </>
      )}
    </div>
  )
}

export default MissionDetailpage
