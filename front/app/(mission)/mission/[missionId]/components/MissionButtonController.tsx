'use client'
import { memberEmailStore } from '@/stores/memberEmail'
import MissionExitButton from './MissionExitButton'
import MissionJoinButton from './MissionJoinButton'
import MissionWaitingList from './MissionWaitingList'
import { useQuery } from '@tanstack/react-query'
interface MemberCard {
  memberNickname: string
  memberImgUrl: string
}

const MissionButtonController = ({
  isSaveMission,
  missionCategory,
  missionTargetPrice,
  missionCategoryId,
  missionPeriod,
  missionId,
  missionDeposit,
  missionTotalCycle,
}: {
  isSaveMission: boolean
  missionCategory: string
  missionTargetPrice: number
  missionCategoryId: number
  missionPeriod: number
  missionId: string
  missionDeposit: number
  missionTotalCycle: number
}) => {
  const { data, refetch } = useQuery({
    queryKey: ['WaitingList', missionId],
    queryFn: () => getMissionWaitListFetch(missionId),
  })
  const { memberNickname } = memberEmailStore()
  return (
    <div>
      <MissionWaitingList data={data} />
      {data &&
      data.length > 0 &&
      (data as MemberCard[]).some(
        (member) => member.memberNickname === memberNickname,
      ) ? (
        <MissionExitButton missionId={missionId} refetch={refetch} />
      ) : (
        <MissionJoinButton
          isSaveMission
          missionCategory={missionCategory}
          missionTargetPrice={missionTargetPrice}
          missionCategoryId={missionCategoryId}
          missionPeriod={missionPeriod}
          missionId={missionId}
          refetch={refetch}
          missionDeposit={missionDeposit}
          missionTotalCycle={missionTotalCycle}
        />
      )}
    </div>
  )
}

const getMissionWaitListFetch = async (missionId: string) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/mission/members/${missionId}`,
    { next: { revalidate: 200 } },
  ).then((res) => {
    return res.json()
  })
}

export default MissionButtonController
