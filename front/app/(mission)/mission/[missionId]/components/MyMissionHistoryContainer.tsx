'use client'

import MyMissionHistoryCard from './MyMissionHistoryCard'
import { GroupStatusProps } from '@/app/types'
import { RecordList } from '@/app/types'
import { recordListStore } from '@/stores/recordListStore'
enum Property {
  'recordNumber',
  'recordStartDate',
  'recordEndDate',
  'recordStatus',
  'recordList',
}

interface MyRecordHistory {
  0: number
  1: string
  2: string
  3: number
  4: Array<any>
  [key: number]: any
}

const MyMissionHistoryContainer = ({
  propsData,
  data,
}: {
  propsData: GroupStatusProps
  data: Array<any>[]
}) => {
  const { recordMap } = recordListStore()

  return (
    <div className="bg-background p-5 rounded-lg mx-5">
      <div className="font-scDreamMedium mb-[7.5px]">미션 기록</div>
      <hr />
      {data &&
        (data as Array<any>[]).map((element, idx) => (
          <MyMissionHistoryCard
            data={element}
            propsData={propsData}
            key={idx}
            recordId={recordMap[element[Property.recordNumber]]}
          />
        ))}
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
        paegeNumber: input.pageNumber,
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
