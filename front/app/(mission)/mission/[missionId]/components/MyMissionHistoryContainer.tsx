import { myMissionHistory } from '@/app/dummies'
import MyMissionHistoryCard from './MyMissionHistoryCard'
import { GroupStatusProps } from '@/app/types'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
enum MyRecordHistoryProperty {
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

const EMAIL_DUMMY = 'jiwon@seesaw.com'

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
    console.log('진짜결과', js)
    return js
  })
}

const MyMissionHistoryContainer = ({
  propsData,
}: {
  propsData: GroupStatusProps
}) => {
  const { mutate, isSuccess, data } = useMutation(getMyRecordHistory)
  useEffect(() => {
    mutate({
      missionId: propsData.missionId,
      memberEmail: EMAIL_DUMMY,
      pageNumber: 0,
    })
  }, [])
  console.log('mymissionHistory', data)
  return (
    <div className="bg-background p-5 rounded-lg mx-5">
      <div className="font-scDreamMedium">미션 기록</div>
      <hr />
      {data &&
        (data as Array<any>[]).map((element, idx) => (
          <MyMissionHistoryCard
            data={element}
            propsData={propsData}
            key={idx}
          />
        ))}
    </div>
  )
}

export default MyMissionHistoryContainer
