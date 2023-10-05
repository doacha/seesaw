'use client'

import GroupMissionHistoryCard from './GroupMissionHistoryCard'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { GroupStatusProps } from '@/app/types'
import { RecordDetail } from '@/app/types'
import { recordListStore } from '@/stores/recordListStore'
import { memberEmailStore } from '@/stores/memberEmail'
import useIntersect from '@/app/(mission)/useIntersect'

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
  const [pageNumber, setPageNumber] = useState(0)
  const [hasNext, setHasNext] = useState(true)
  const [groupMissionHistory, setGroupMissionHistory] = useState<
    RecordDetail[][]
  >([])
  const { recordMap, recordStatus, setRecordMap } = recordListStore()
  const { memberNickname } = memberEmailStore()

  useEffect(() => {
    const init = async () => {
      let temp = (await getPastRecord({
        missionId: recordStatus.missionId,
        pageNumber: 0,
      })) as RecordDetail[][]
      const newRecordMap: { [key: number]: any } = { ...recordMap }
      temp.forEach((recordListByRecordNumber) => {
        let idx = recordListByRecordNumber.findIndex(
          (record) => record.memberNickname === memberNickname,
        )
        const number = recordListByRecordNumber[idx].recordNumber
        const id = recordListByRecordNumber[idx].recordId
        newRecordMap[number] = id
      })
      setRecordMap(newRecordMap)
      if (temp.length < 5) {
        setHasNext(false)
      }
      setGroupMissionHistory(temp)
      setPageNumber(1)
    }
    init()
  }, [])

  const [_, setRef] = useIntersect(async (entry, observer) => {
    // 불러올게없을때
    if (!hasNext) return

    let temp = (await getPastRecord({
      missionId: recordStatus.missionId,
      pageNumber: pageNumber,
    })) as RecordDetail[][]
    const newRecordMap: { [key: number]: any } = { ...recordMap }
    temp.forEach((recordListByRecordNumber) => {
      let idx = recordListByRecordNumber.findIndex(
        (record) => record.memberNickname === memberNickname,
      )
      const number = recordListByRecordNumber[idx].recordNumber
      const id = recordListByRecordNumber[idx].recordId
      newRecordMap[number] = id
    })
    setRecordMap(newRecordMap)
    if (temp.length < 5) {
      setHasNext(false)
    }

    setGroupMissionHistory((prev) => prev.concat(temp))
    setPageNumber((prev) => prev + 1)

    observer.unobserve(entry.target)
  }, {})

  return (
    <div className="rounded-lg bg-background p-5 m-5">
      <div className="font-scDreamMedium">미션 기록</div>
      <hr />
      {groupMissionHistory &&
        (groupMissionHistory as RecordDetail[][]).map((element, idx) => (
          <GroupMissionHistoryCard
            data={element}
            missionData={data}
            key={idx}
          />
        ))}
      {groupMissionHistory.length > 0 && (
        <div className="opacity-0" ref={setRef}>
          now loading
        </div>
      )}
    </div>
  )
}

export default GroupMissionHistoryContainer
