'use client'

import MyMissionHistoryCard from './MyMissionHistoryCard'
import { GroupStatusProps } from '@/app/types'
import { RecordList } from '@/app/types'
import { recordListStore } from '@/stores/recordListStore'
import { useEffect, useState } from 'react'
import useIntersect from '@/app/(mission)/useIntersect'
import { memberEmailStore } from '@/stores/memberEmail'
enum Property {
  'recordNumber',
  'recordStartDate',
  'recordEndDate',
  'recordStatus',
  'recordList',
}

const MyMissionHistoryContainer = ({
  propsData,
  data,
}: {
  propsData: GroupStatusProps
  data: Array<any>[]
}) => {
  const [pageNumber, setPageNumber] = useState(0)
  const [hasNext, setHasNext] = useState(true)
  const [history, setHistory] = useState<Array<any>>([])
  const { recordMap } = recordListStore()
  const { memberEmail } = memberEmailStore()

  useEffect(() => {
    const init = async () => {
      let temp = await getMyRecordHistory({
        missionId: propsData.missionId,
        memberEmail,
        pageNumber: 0,
      })
      setHistory(temp)
      if (temp.length < 5) {
        setHasNext(false)
      }
      setPageNumber(1)
    }
    init()
  }, [])

  const [_, setRef] = useIntersect(async (entry, observer) => {
    // 불러올게없을때
    if (!hasNext) return

    let temp = await getMyRecordHistory({
      missionId: propsData.missionId,
      memberEmail,
      pageNumber,
    })

    if (temp.length < 5) {
      setHasNext(false)
    }

    setHistory((prev) => prev.concat(temp))
    setPageNumber((prev) => prev + 1)

    observer.unobserve(entry.target)
  }, {})

  return (
    <div className="bg-background p-5 rounded-lg mx-5">
      <div className="font-scDreamMedium mb-[7.5px]">미션 기록</div>
      <hr />
      {(history as Array<any>[]).map((element, idx) => (
        <MyMissionHistoryCard
          data={element}
          propsData={propsData}
          key={idx}
          recordId={recordMap[element[Property.recordNumber]]}
        />
      ))}
      {history.length > 0 && (
        <div className="opacity-0" ref={setRef}>
          now loading{' '}
        </div>
      )}
    </div>
  )
}

const getMyRecordHistory = async (input: {
  missionId: string
  memberEmail: string
  pageNumber: number
}) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/record/spending-list`,
    {
      method: 'POST',
      body: JSON.stringify({
        missionId: input.missionId,
        memberEmail: input.memberEmail,
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

const convertResponseToList = (res: Array<any>[]) => {
  const recordList: RecordList[] = []
  res.forEach((element, idx) => {
    const record: RecordList = {
      recordNumber: 0,
      recordList: [],
    }
    record.recordNumber = element[Property.recordNumber]
    for (let i = 4; i < element.length; i++) {
      record.recordList.push({
        recordName: element[i][0],
        recordCost: element[i][1],
      })
    }
    recordList.push(record)
  })
  return recordList
}

export default MyMissionHistoryContainer
