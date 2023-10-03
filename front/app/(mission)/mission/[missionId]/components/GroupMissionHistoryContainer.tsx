'use client'

import GroupMissionHistoryCard from './GroupMissionHistoryCard'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { GroupStatusProps } from '@/app/types'
import { RecordDetail } from '@/app/types'
import { recordListStore } from '@/stores/recordListStore'
const DUMMY_NICKNAME = '지원'
const getPastRecord = async (input: {
  missionId: string
  pageNumber: number
}) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/record/history`,
    {
      method: 'POST',
      body: JSON.stringify({
        missionId: input.missionId,
        pageNumber: input.pageNumber,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  ).then((res) => {
    let js = res.json()
    return js
  })
}

const GroupMissionHistoryContainer = ({ data }: { data: GroupStatusProps }) => {
  const { mutate, data: groupMissionHistory } = useMutation(getPastRecord)
  const { recordMap, setRecordMap } = recordListStore()
  useEffect(() => {
    mutate(
      {
        missionId: data.missionId,
        pageNumber: 0,
      },
      {
        onSuccess: (res: RecordDetail[][]) => {
          const newRecordMap: { [key: number]: any } = { ...recordMap }
          res.forEach((recordListByRecordNumber) => {
            let idx = recordListByRecordNumber.findIndex((record) => {
              record.memberNickname === DUMMY_NICKNAME
            })
            const number = recordListByRecordNumber[idx].recordNumber
            const id = recordListByRecordNumber[idx].recordId
            newRecordMap[number] = id
          })
          setRecordMap(newRecordMap)
        },
        onError: (err) => console.log(err),
      },
    )
  }, [])
  return (
    <div className="rounded-lg bg-background p-5 m-5">
      <div className="font-scDreamMedium">미션 기록</div>
      <hr />
      {((groupMissionHistory as RecordDetail[][]) ?? []).map((element, idx) => (
        <GroupMissionHistoryCard data={element} missionData={data} key={idx} />
      ))}
    </div>
  )
}

export default GroupMissionHistoryContainer
