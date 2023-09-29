'use client'
import { MissingStaticPage } from 'next/dist/shared/lib/utils'
import StatusBar from './StatusBar'
import PersonalCard from './PersonalCard'
import { getCycleTerm } from '../../../util'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useRef } from 'react'
interface missionResult {
  memberImgUrl: string
  memberName: string
  status: boolean
  spending: number
  boardId: number
}

interface groupMissionHistoryProps {
  cycleCount: number
  successCount: number
  failCount: number
  missionPeriod: number
  individualResult: Array<missionResult>
}

const GroupMissionHistoryCard = ({
  data,
  startDate,
}: {
  data: groupMissionHistoryProps
  startDate: string
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  return (
    <div className="rounded-lg p-2.5 my-2.5 shadow-md">
      {/* 회차 타이틀 */}
      <div className="flex flex-row justify-between">
        <div>
          <span className="font-scDreamMedium mr-2.5">
            {data.cycleCount} 회차
          </span>
          <span className="text-[10px] text-outline">{`${getCycleTerm(
            startDate,
            data.cycleCount,
            data.missionPeriod,
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
      <StatusBar success={data.successCount} fail={data.failCount} />
      {/* 개인별 결과 */}
      {data.individualResult.map((element, idx) => (
        <PersonalCard data={element} key={idx} />
      ))}
      <dialog id="my_modal_2" className="modal" ref={dialogRef}>
        <div className="modal-box bg-background">
          <div className="font-scDreamMedium mb-2.5">
            {data.cycleCount}회차 전체 명단
          </div>
          <hr className="mb-5" />
          {data.individualResult.map((element, idx) => (
            <PersonalCard data={element} key={idx} />
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
