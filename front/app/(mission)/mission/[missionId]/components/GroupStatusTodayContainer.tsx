'use client'

import { todayMission } from '@/app/dummies'
import GroupStatusTodayCard from './GroupStatusTodayCard'
import { useRouter } from 'next/navigation'
import { GroupStatusProps } from '@/app/types'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { recordListStore } from '@/stores/recordListStore'
import { memberEmailStore } from '@/stores/memberEmail'
import UpdateRecordButton from './UpdateRecordButton'

interface TodayStatus {
  memberImgUrl: string
  memberNickname: string
  recordSuccessCount: number
  recordTotalCost: number
  recordStatus: number
  recordId: number
}
const getTodayMission = async (input: {
  missionId: string
  currentCycle: number
}) => {
  return await fetch(`${process.env.NEXT_PUBLIC_SEESAW_API_URL}/record`, {
    method: 'POST',
    body: JSON.stringify({
      missionId: input.missionId,
      recordNumber: input.currentCycle,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    let js = res.json()
    return js
  })
}

const GroupStatusTodayContainer = ({ data }: { data: GroupStatusProps }) => {
  const router = useRouter()
  const { memberNickname } = memberEmailStore()
  const { recordStatus, recordMap, setTodayRecordId, setRecordMap } =
    recordListStore()
  const { data: todayMission, mutate, isSuccess } = useMutation(getTodayMission)
  console.log('asdfasdf', memberNickname)
  useEffect(() => {
    mutate(
      {
        missionId: data.missionId,
        currentCycle: data.missionCurrentCycle,
      },
      {
        onSuccess: (res: TodayStatus[]) => {
          const targetIdx = res.findIndex(
            (element) => element.memberNickname === memberNickname,
          )
          const recordNumber = data.missionCurrentCycle
          setTodayRecordId(res[targetIdx].recordId, recordStatus)
          setRecordMap({
            ...recordMap,
            [recordNumber]: res[targetIdx].recordId,
          })
          return res
        },
        onError: (err) => console.log('에러sdsd', err),
      },
    )
  }, [])
  return (
    <div className=" rounded-lg bg-background px-5 pt-5 m-5">
      <div className="font-scDreamMedium">
        오늘의 미션 {`(${data.missionCurrentCycle} 회)`}
      </div>
      <hr />
      <div className="carousel w-full overflow-scroll pt-5 pb-6">
        {isSuccess &&
          (todayMission as TodayStatus[]).map((element, idx) => (
            <GroupStatusTodayCard
              data={element}
              targetPrice={data.missionTargetPrice}
              onClick={() =>
                router.push(`${data.missionId}/${element.recordId}`)
              }
              key={idx}
            />
          ))}
      </div>
      {isSuccess && todayMission && todayMission.length > 0 && (
        <UpdateRecordButton
          path={`${recordStatus.missionId}/${getTodayMissionRecord(
            todayMission,
            memberNickname,
          )}`}
        />
      )}
    </div>
  )
}

const getTodayMissionRecord = (data: TodayStatus[], memberNickname: string) => {
  const targetIdx = data.findIndex(
    (element) => element.memberNickname === memberNickname,
  )
  return data[targetIdx].recordId
}

export default GroupStatusTodayContainer
