'use client'
import { MissingStaticPage } from 'next/dist/shared/lib/utils'
import StatusBar from './StatusBar'
import PersonalCard from './PersonalCard'
import { getCycleTerm } from '../../../util'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useRef } from 'react'
import { GroupStatusProps } from '@/app/types'
import { RecordDetail } from '@/app/types'

interface groupMissionHistoryProps {
  cycleCount: number
  successCount: number
  failCount: number
  missionPeriod: number
  individualResult: Array<RecordDetail>
}

const GroupMissionHistoryCard = ({
  data,
  missionData,
}: {
  data: RecordDetail[]
  missionData: GroupStatusProps
}) => {
  console.log(data, 'asdfasdf')
  const dialogRef = useRef<HTMLDialogElement>(null)
  const cycleCount = data[0].recordNumber
  let successCount = 0,
    failCount = 0
  data.forEach((record) => {
    if (record.recordStatus === 1 || record.recordStatus === 0) {
      successCount++
    } else if (record.recordStatus === 2) {
      failCount++
    }
  })
  return (
    <div className="rounded-lg p-2.5 my-2.5 shadow-md">
      {/* 회차 타이틀 */}
      <div className="flex flex-row justify-between">
        <div>
          <span className="font-scDreamMedium mr-2.5">{cycleCount} 회차</span>
          <span className="text-[10px] text-outline">{`${getCycleTerm(
            missionData.missionStartDate,
            cycleCount,
            missionData.missionPeriod,
          )}`}</span>
        </div>
        <div
          className="text-xs text-outline my-auto"
          onClick={() => dialogRef.current?.showModal()}
        >
          더보기
        </div>
      </div>
      {/* 현황 바 */}
      <StatusBar success={successCount} fail={failCount} />
      {/* 개인별 결과 */}
      {data.map((element) => (
        <PersonalCard data={element} key={element.recordId} />
      ))}
      <dialog id="my_modal_2" className="modal" ref={dialogRef}>
        <div className="modal-box bg-background">
          <div className="font-scDreamMedium mb-2.5">
            {cycleCount}회차 전체 명단
          </div>
          <hr className="mb-5" />
          {data.map((element) => (
            <PersonalCard data={element} key={element.recordId} />
          ))}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  )
}

export default GroupMissionHistoryCard
