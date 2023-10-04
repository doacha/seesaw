import MissionDetailContainer from './components/MissionDetailContainer'
import MissionDetailContents from './components/MissionDetailContents'
import MissionWaitingList from './components/MissionWaitingList'
import { categoryList } from '@/app/lib/constants'
import { MissionDetail } from '@/app/types'
import UpdateRecordButton from './components/UpdateRecordButton'
import MissionButtonController from './components/MissionButtonController'
// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/router'
const MISSION_WAIT = 0
const MISSION_START = 1

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

// API 연결 이후 params를 통해 데이터를 가져와야 한다.
const MissionDetailpage = async ({ params }: { params: any }) => {
  console.log('파라라라라파만팜ㅇㄴ팜ㅇ팡ㄴㅍ안ㅍㅁ낲만팜ㄴ판ㅇ파', params)
  const data = (await getMissionDetailFetch(params.missionId)) as MissionDetail
  // const missionWaitList = (await getMissionWaitListFetch(
  //   params.missionId,
  // )) as MemberCard[]
  // console.log('대기명단', missionWaitList)
  const contentsProps = {
    missionId: params.missionId,
    missionPeriod: data.missionPeriod,
    missionTargetPrice: data.missionTargetPrice,
    missionStartDate: data.missionStartDate,
    missionCurrentCycle: data.missionCurrentCycle,
    missionDeposit: data.missionDeposit,
    missionTitle: data.missionTitle,
  }

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
          <MissionButtonController
            isSaveMission
            missionCategory={categoryList[data.missionCategoryId]}
            missionTargetPrice={data.missionTargetPrice}
            missionCategoryId={data.missionCategoryId}
            missionPeriod={data.missionPeriod}
            missionId={data.missionId}
          />
        </>
      )}
    </div>
  )
}

export default MissionDetailpage
