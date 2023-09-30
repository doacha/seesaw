'use client'

import { todayMission } from '@/app/dummies'
import GroupStatusTodayCard from './GroupStatusTodayCard'
import { useRouter } from 'next/navigation'
import { GroupStatusProps } from '@/app/types'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
interface TodayStatus {
  memberImgUrl: string
  memberNickname: string
  recordSuccessCount: number
  recordTotalCost: number
  recordStatus: number
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
    console.log('로우확인', js)
    return js
  })
}

const GroupStatusTodayContainer = ({ data }: { data: GroupStatusProps }) => {
  const router = useRouter()

  const { data: todayMission, mutate, isSuccess } = useMutation(getTodayMission)

  useEffect(() => {
    mutate(
      {
        missionId: data.missionId,
        currentCycle: data.missionCurrentCycle,
      },
      {
        onSuccess: (res) => {
          console.log('answerasdfas', res)
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
              targetPrice={todayMission.missionTargetPrice}
              onClick={() => router.push('ndU1ZQjkV8/1')}
              key={idx}
            />
          ))}
      </div>
    </div>
  )
}

export default GroupStatusTodayContainer
