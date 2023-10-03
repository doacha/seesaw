'use client'
import Tab from '@/app/components/Tab'
import { useState, useEffect } from 'react'
import GroupStatus from './GroupStatus'
import MyStatus from './MyStatus'
import { GroupStatusProps } from '@/app/types'
import { recordListStore } from '@/stores/recordListStore'
import { useMutation } from '@tanstack/react-query'
import { RecordList } from '@/app/types'

enum Property {
  'recordNumber',
  'recordStartDate',
  'recordEndDate',
  'recordStatus',
  'recordList',
}

const EMAIL_DUMMY = 'jiwon@seesaw.com'

const MissionDetailContents = ({ data }: { data: GroupStatusProps }) => {
  const [activeTab, setActiveTab] = useState('tab1')
  const { recordStatus, recordMap, setRecordList, setRecordStatus } =
    recordListStore()
  const { mutate, data: recordHistory } = useMutation(getMyRecordHistory)

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }
  if (recordStatus.missionId !== data.missionId) {
    setRecordStatus({
      missionId: data.missionId,
      missionPeriod: data.missionPeriod,
      missionStartDate: data.missionStartDate,
      missionTargetPrice: data.missionTargetPrice,
      pageNumber: -1,
      missionCurrentCycle: data.missionCurrentCycle,
      todayRecordId: 0,
    })
  }

  useEffect(() => {
    // mutation 한 번만 발동, 성공 뒤 recordList store에 저장. 중복 저장 방지용 페이지넘버 체크
    mutate(
      {
        missionId: data.missionId,
        memberEmail: EMAIL_DUMMY,
        pageNumber: 0,
      },
      {
        onSuccess: (res) => {
          if (recordStatus.pageNumber !== 0) {
            const newRecordStatus = { ...recordStatus }
            newRecordStatus.pageNumber = 0
            setRecordList(convertResponseToList(res), newRecordStatus)
          }
        },
      },
    )
  }, [])

  return (
    <div className="">
      <Tab
        labels={['그룹 현황', '내 현황']}
        activeTab={activeTab}
        handleTabChange={handleTabChange}
      />
      {activeTab === 'tab1' ? (
        <GroupStatus data={data} />
      ) : (
        <MyStatus data={data} recordHistory={recordHistory} />
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
export default MissionDetailContents
