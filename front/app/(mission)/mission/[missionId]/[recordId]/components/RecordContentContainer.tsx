'use client'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPenToSquare,
  faEllipsis,
  faChevronDown,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons'
import { getCycleTerm, getTimeBefore } from '../../../../util'
import SpendingHistory from './SpendingHistory'
import { recordListStore } from '@/stores/recordListStore'
import { useRef, useState, useEffect } from 'react'
import { memberEmailStore } from '@/stores/memberEmail'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'

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
  spendingHistory,
  recordId,
}: {
  spendingHistory: Array<{
    spendingTitle: string
    spendingCost: number
  }>
  recordId: number
}) => {
  const { data, isSuccess } = useQuery({
    queryKey: ['recordDetail', recordId],
    queryFn: () => getRecordContent(recordId),
    staleTime: 1000,
  })
  const { memberEmail, memberNickname } = memberEmailStore()
  const { recordList, recordStatus } = recordListStore()
  const [isOpened, setIsOpened] = useState<Boolean>(false)
  const checkRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const [recordDetail, setRecordDetail] = useState<RecordDetailProps>({
    recordId: 0,
    recordContent: '',
    recordWriteTime: '',
    recordTotalCost: 0,
    recordNumber: 0,
    recordStatus: 0,
    memberEmail: memberEmail,
    memberNickname: memberNickname,
    memberImgUrl: '',
  })
  const [bgColor, textColor, successText] =
    data?.recordStatus !== 2
      ? ['bg-seesaw-blue-100', 'text-primary', '성공']
      : ['bg-seesaw-red-100', 'text-error', '실패']
  const balance = recordStatus.missionTargetPrice - data?.recordTotalCost
  let passTime = ''

  // const getRecordList = (recordNumber: number, list: RecordList[]) => {
  //   if (list.length === 0) {
  //     return
  //   }
  //   const targetIdx = list.findIndex(
  //     (element) => element.recordNumber === recordNumber,
  //   )
  //   console.log('스토어확인', list)
  //   return list[targetIdx].recordList
  // }

  useEffect(() => {
    const init = async () => {
      setRecordDetail(await data)
    }
    init()
  }, [])
  return (
    <div className="rounded-lg bg-background m-5">
      {/* 헤더 */}
      <div className={`${bgColor} p-5 rounded-t-lg`}>
        <div className="flex justify-between w-full mb-2.5">
          <span>
            <span className="font-scDreamMedium mr-[10px]">
              {data && data.recordNumber}회차
            </span>
            <span className="text-[10px] text-outline">
              {isSuccess &&
                data &&
                getCycleTerm(
                  recordStatus.missionStartDate,
                  data.recordNumber,
                  recordStatus.missionPeriod,
                )}
            </span>
          </span>
          {data && memberEmail === data.memberEmail && (
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="text-outline"
              onClick={() => router.push(`${recordId}/create`)}
            />
          )}
        </div>
        <div className={`collapse rounded-t-lg rounded-b-none`}>
          <input
            type="checkbox"
            ref={checkRef}
            onClick={() => setIsOpened(!isOpened)}
          />
          {/* collapase title 간략 정보*/}
          <div className="collapse-title flex flex-col items-center p-0">
            {/* 기간 및 자세히 보기 */}

            {/* 프로필 및 등록 시간 */}
            <div className="flex justify-between items-center w-full mb-2.5">
              <span>
                <Image
                  src={data?.memberImgUrl ?? '/default_profile.svg'}
                  width={35}
                  height={35}
                  alt="member profile image"
                  className="rounded-full inline-block mr-[15px] bg-white w-[35px] h-[35px]"
                />
                <span>{data && data.memberNickname}</span>
              </span>
              <span className="text-[10px] text-outline">
                {getTimeBefore(data?.recordWriteTime)}
              </span>
            </div>
            {/* 성공 여부 및 잔액 */}
            <div className="w-full flex justify-between">
              <span className={`font-scDreamExBold ${textColor}`}>
                {successText}
              </span>
              <span>
                <span className="text-[10px] text-outline mr-[10px]">소비</span>
                <span className={`font-scDreamExBold ${textColor}`}>
                  {data && data.recordTotalCost.toLocaleString('ko-KR')}
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
            history={spendingHistory}
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
      </div>
      {/* 본문 */}

      <div className="p-5">
        {(data && data.recordContent) ?? '입력된 메모가 없습니다.'}
      </div>
    </div>
  )
}

const getRecordContent = async (recordId: number) => {
  console.log('이거왜 언디파인드', recordId)
  return await fetch(
    `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/record/${recordId}`,
    {
      method: 'get',
    },
  ).then((res) => {
    let s = res.json()
    return s
  })
}

export default RecordContentContainer
