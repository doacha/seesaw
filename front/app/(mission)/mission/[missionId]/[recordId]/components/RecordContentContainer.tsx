'use client'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleDown,
  faEllipsis,
  faChevronDown,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons'
import { getCycleTerm, getTimeBefore } from '../../../../util'
import { text } from 'stream/consumers'
import SpendingHistory from './SpendingHistory'
import { recordListStore } from '@/stores/recordListStore'
import { RecordList } from '@/app/types'
import { useRef, useState, useEffect } from 'react'
interface RecordDetailProps {
  recordId: number
  recordContent: string
  recordWriteTime: string
  recordTotalCost: number
  recordNumber: number
  recordStatus: number
  memberEmail: string
  memberNickname: string
  memberImgUrl: string
}
const RecordContentContainer = ({
  propsData,
}: {
  propsData: RecordDetailProps
}) => {
  console.log('프롭스확인', propsData)
  const { recordList, recordStatus } = recordListStore()
  const [isOpened, setIsOpened] = useState<Boolean>(false)
  const checkRef = useRef<HTMLInputElement>(null)
  const [bgColor, textColor, successText] =
    propsData.recordStatus !== 2
      ? ['bg-seesaw-blue-100', 'text-primary', '성공']
      : ['bg-seesaw-red-100', 'text-error', '실패']
  const balance = recordStatus.missionTargetPrice - propsData.recordTotalCost
  let passTime = ''

  const getRecordList = (recordNumber: number, list: RecordList[]) => {
    if (list.length === 0) {
      return
    }
    const targetIdx = list.findIndex(
      (element) => element.recordNumber === recordNumber,
    )
    console.log('스토어확인', list)
    return list[targetIdx].recordList
  }

  useEffect(() => {
    passTime = getTimeBefore(propsData.recordWriteTime)
  })
  return (
    <div className="rounded-lg bg-background m-5">
      {/* 헤더 */}
      <div className={`collapse ${bgColor} rounded-t-lg rounded-b-none p-5`}>
        <input
          type="checkbox"
          ref={checkRef}
          onClick={() => setIsOpened(!isOpened)}
        />
        {/* collapase title 간략 정보*/}
        <div className="collapse-title flex flex-col items-center p-0">
          {/* 기간 및 자세히 보기 */}
          <div className="flex justify-between w-full mb-2.5">
            <span>
              <span className="font-scDreamMedium mr-[10px]">
                {propsData.recordNumber}회차
              </span>
              <span className="text-[10px] text-outline">
                {getCycleTerm(
                  recordStatus.missionStartDate,
                  propsData.recordNumber,
                  recordStatus.missionPeriod,
                )}
              </span>
            </span>
            <FontAwesomeIcon icon={faEllipsis} className="text-outline" />
          </div>
          {/* 프로필 및 등록 시간 */}
          <div className="flex justify-between items-center w-full mb-2.5">
            <span>
              <Image
                src={propsData.memberImgUrl ?? '/default_profile.svg'}
                width={35}
                height={35}
                alt="member profile image"
                className="rounded-full inline-block mr-[15px]"
              />
              <span>{propsData.memberNickname}</span>
            </span>
            <span className="text-[10px] text-outline">{passTime}</span>
          </div>
          {/* 성공 여부 및 잔액 */}
          <div className="w-full flex justify-between">
            <span className={`font-scDreamExBold ${textColor}`}>
              {successText}
            </span>
            <span>
              <span className="text-[10px] text-outline mr-[10px]">잔액</span>
              <span className={`font-scDreamExBold ${textColor}`}>
                {propsData.recordTotalCost.toLocaleString('ko-KR')}
              </span>
            </span>
          </div>
          <div className="w-full text-center">
            <hr className="border-outline my-2.5 w-full" />
            {!isOpened && <FontAwesomeIcon icon={faChevronDown} />}
          </div>
        </div>
        {/* collpase content - 거래 내역 상세 */}
        <SpendingHistory
          textColor={textColor}
          targetPrice={recordStatus.missionTargetPrice}
          history={getRecordList(propsData.recordNumber, recordList)}
          balance={balance}
        />
        {isOpened && (
          <FontAwesomeIcon
            icon={faChevronUp}
            className="mx-auto"
            onClick={() => checkRef.current?.click()}
          />
        )}
      </div>
      {/* 본문 */}
      <div className="p-5">
        {propsData.recordContent ?? '입력된 메모가 없습니다.'}
      </div>
    </div>
  )
}

export default RecordContentContainer
