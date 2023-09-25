'use client'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { getCycleTerm, getTimeBefore } from '../../util'
import { text } from 'stream/consumers'
import SpendingHistory from './SpendingHistory'
const boardDetailDummy = {
  recordId: 1,
  recordContent: '수정을 해보자',
  recordWriteTime: '2023-09-12T14:42:17.000+00:00',
  recordTotalCost: 0,
  recordNumber: 1,
  recordStatus: 1,
  memberEmail: 'doacha1@seesaw.com',
  memberNickname: '도아차',
  memberImgUrl: '/차차_군침이.jpg',
  missionTargetPrice: 30000,
  recordSpendingHistory: [
    {
      recordHistory: '스벅 먹음',
      recordPrice: 5900,
    },
    {
      recordHistory: '스벅 먹음',
      recordPrice: 5900,
    },
  ],
}

interface boardDetailProps {
  recordId: number
  recordContent: string
  recordWriteTime: string
  recordTotalCost: number
  recordNumber: number
  recordStatus: number
  memberEmail: string
  memberNickname: string
  memberImgUrl: string
  missionTargetPrice: number
  recordSpendingHistory: Array<{ recordHistory: string; recordPrice: number }>
}
const RecordContentContainer = (/*{ data }: { data: boardDetailProps }*/) => {
  const data = boardDetailDummy
  const [bgColor, textColor, successText] =
    data.recordStatus === 1
      ? ['bg-seesaw-blue-100', 'text-primary', '성공']
      : ['bg-seesaw-red-100', 'text-error', '실패']
  const balance = data.missionTargetPrice - data.recordTotalCost
  return (
    <div className="rounded-lg bg-background m-5">
      {/* 헤더 */}
      <div className={`collapse ${bgColor} rounded-t-lg rounded-b-none p-5`}>
        <input type="checkbox" />
        {/* collapase title 간략 정보*/}
        <div className="collapse-title flex flex-col items-center p-0">
          {/* 기간 및 자세히 보기 */}
          <div className="flex justify-between w-full mb-2.5">
            <span>
              <span className="font-scDreamMedium mr-[10px]">
                {data.recordNumber}회차
              </span>
              <span className="text-[10px] text-outline">
                {getCycleTerm(`2023-09-12T14:42:17.000+00:00`, 1, 1)}
              </span>
            </span>
            <FontAwesomeIcon icon={faEllipsis} className="text-outline" />
          </div>
          {/* 프로필 및 등록 시간 */}
          <div className="flex justify-between items-center w-full mb-2.5">
            <span>
              <Image
                src={data.memberImgUrl}
                width={35}
                height={35}
                alt="user profile image"
                className="rounded-full inline-block mr-[15px]"
              />
              <span>{data.memberNickname}</span>
            </span>
            <span className="text-[10px] text-outline">
              {getTimeBefore(`2023-09-18 11:37:17.000+00:00`)}
            </span>
          </div>
          {/* 성공 여부 및 잔액 */}
          <div className="w-full flex justify-between">
            <span className={`font-scDreamExBold ${textColor}`}>
              {successText}
            </span>
            <span>
              <span className="text-[10px] text-outline mr-[10px]">잔액</span>
              <span className={`font-scDreamExBold ${textColor}`}>
                {data.recordTotalCost.toLocaleString('ko-KR')}
              </span>
            </span>
          </div>
          <div className="w-full text-center">
            <hr className="border-outline my-2.5 w-full" />
            <FontAwesomeIcon icon={faAngleDown} />
          </div>
        </div>
        {/* collpase content - 거래 내역 상세 */}
        <SpendingHistory
          textColor={textColor}
          targetPrice={data.missionTargetPrice}
          history={data.recordSpendingHistory}
          balance={balance}
        />
      </div>
      {/* 본문 */}
      <div className="p-5">{data.recordContent}</div>
    </div>
  )
}

export default RecordContentContainer
