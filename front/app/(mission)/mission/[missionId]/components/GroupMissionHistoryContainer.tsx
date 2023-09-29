'use client'

import GroupMissionHistoryCard from './GroupMissionHistoryCard'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { GroupStatusProps } from '@/app/types'
import { RecordDetail } from '@/app/types'

const getPastRecord = async (input: {
  missionId: string
  pageNumber: number
}) => {
  return await fetch(`${process.env.NEXT_PUBLIC_SEESAW_API_URL}/record`, {
    method: 'POST',
    body: JSON.stringify({
      missionId: input.missionId,
      pageNumber: input.pageNumber,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    let js = res.json()
    console.log('진짜결과', js)
    return js
  })
}

const GroupMissionHistoryContainer = ({ data }: { data: GroupStatusProps }) => {
  const {
    mutate,
    data: groupMissionHistory,
    isSuccess,
  } = useMutation(getPastRecord)
  console.log('asdfasdfasdf', data.missionId)
  useEffect(() => {
    mutate(
      {
        missionId: data.missionId,
        pageNumber: 0,
      },
      {
        onSuccess: (res) => console.group('아뭐냐고', res),
        onError: (err) => console.log(err),
      },
    )
  }, [])
  return (
    <div className="rounded-lg bg-background p-5 m-5">
      <div className="font-scDreamMedium">미션 기록</div>
      <hr />
      {isSuccess &&
        (groupMissionHistory as RecordDetail[][]).map((element, idx) => (
          <GroupMissionHistoryCard
            data={element}
            missionData={data}
            startDate={groupMissionHistory.startDate}
            key={idx}
          />
        ))}
    </div>
  )
}

export default GroupMissionHistoryContainer
