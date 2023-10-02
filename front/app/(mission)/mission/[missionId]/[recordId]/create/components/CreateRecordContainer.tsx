import { getCycleTerm } from '@/app/(mission)/util'
import Image from 'next/image'
import RecordSpendingHistory from './RecordSpendingHistory'
import Button from '@/app/components/Button'
import { useQuery, useMutation } from '@tanstack/react-query'
import { recordListStore } from '@/stores/recordListStore'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
const CreateRecordContainer = ({ recordId }: { recordId: number }) => {
  const { data, isSuccess } = useQuery({
    queryKey: ['record', recordId],
    queryFn: () => getRecordDetail(recordId),
    staleTime: 10 * 1000,
    suspense: true,
  })
  const { mutate } = useMutation(putRecordContent)
  const { recordList, recordStatus } = recordListStore()
  const [textInput, setTextInput] = useState('')
  const router = useRouter()
  // 렌더링용 초기데이터 Init 과정
  const recordTargetIdx = recordList.findIndex(
    (element) => element.recordNumber === recordStatus.missionCurrentCycle,
  )
  let history: {
    recordName: string
    recordCost: number
  }[]
  if (recordList.length > 0 && recordList[recordTargetIdx] !== undefined) {
    history = recordList[recordTargetIdx].recordList
  } else {
    history = []
  }
  if (isSuccess && textInput.length === 0) {
    console.log('수정에서 받아오는거', data)
    setTextInput(data.recordContent)
  }

  const handleSubmit = () => {
    mutate(
      { recordId, recordContent: textInput },
      {
        onSuccess: (res) => {
          console.log(res)
          router.push(`/mission/${recordStatus.missionId}/${recordId}`)
        },
        onError: (err) => console.log('수정실패', err),
      },
    )
  }
  return (
    <div className="rounded-lg bg-background m-5">
      {/* 헤더 */}
      {data && (
        <>
          <div
            className={`collapse-title flex flex-col items-center bg-primary-container ${
              data.recordTotalCost >= 0 ? 'bg-seesaw-blue-100' : 'bg-red-100'
            } rounded-t-lg p-5`}
          >
            {/* 기간 및 자세히 보기 */}
            <div className="flex justify-between w-full mb-2.5">
              <span>
                <span className="font-scDreamMedium mr-[10px]">
                  {data.recordNumber}회차
                </span>
                <span className="text-[10px] text-outline">
                  {getCycleTerm(
                    recordStatus.missionStartDate,
                    data.recordNumber,
                    recordStatus.missionPeriod,
                  )}
                </span>
              </span>
              {/* <FontAwesomeIcon icon={faEllipsis} className="text-outline" /> */}
            </div>
            {/* 프로필 및 등록 시간 */}
            <div className="flex justify-between items-center w-full mb-2.5">
              <span>
                <Image
                  src={data.memberImgUrl ?? '/default_profile.svg'}
                  width={35}
                  height={35}
                  alt="member profile image"
                  className="rounded-full inline-block mr-[15px]"
                />
                <span>{data.memberNickname}</span>
              </span>
            </div>
          </div>
          {/* 상세내역 */}
          <RecordSpendingHistory
            textColor={data.recordTotalCost < 0 ? 'text-error' : 'text-primary'}
            targetPrice={recordStatus.missionTargetPrice}
            history={history ?? []}
            balance={data.recordTotalCost}
          />
          {/* 인풋 영역 */}
          <div className="m-5">
            <textarea
              className="textarea textarea-primary w-full h-[215px] border-outline-container"
              placeholder="글 내용을 작성해주세요."
              onChange={(e) => setTextInput(e.target.value)}
              value={textInput}
            />
          </div>
          <div className="grid grid-cols-2 gap-2 p-5">
            <Button
              color="error"
              label="취소"
              size="sm"
              onClick={() => router.back()}
            />
            <Button
              color="primary"
              label="등록하기"
              size="sm"
              onClick={handleSubmit}
            />
          </div>
        </>
      )}
    </div>
  )
}

const getRecordDetail = async (recordId: number) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/record/${recordId}`,
  ).then((res) => res.json())
}

const putRecordContent = async ({
  recordId,
  recordContent,
}: {
  recordId: number
  recordContent: string
}) => {
  console.log(recordId, recordContent)
  return await fetch(
    `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/record/update`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recordId,
        recordContent,
      }),
    },
  ).then((res) => res.json())
}

export default CreateRecordContainer
