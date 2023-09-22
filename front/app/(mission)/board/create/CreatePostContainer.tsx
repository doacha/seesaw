import { getCycleTerm, getTimeBefore } from '../../util'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import BoardSpendingHistory from './components/BoardSpendingHistory'
import Button from '@/app/components/Button'
import Input from '@/app/components/Input'
const propsedDummy = {
  memberNickname: '도아차',
  memberImgUrl: '/차차_군침이.jpg',
  recordNumber: 4,
  missionTargetPrice: 30000,
  missionSpendingHistory: [
    {
      recordHistory: 'BBQ 사먹음',
      recordPrice: 20900,
    },
    {
      recordHistory: '스벅 커피 사먹음',
      recordPrice: 5900,
    },
  ],
  balance: 3200,
}
interface CreatePostProps {
  memberNickname: string
  memberImgUrl: string
  recordNumber: number
  missionTargetPrice: number
  missionSpendingHistory: Array<{ recordHistory: string; recordPrice: number }>
  balance: number
}

const CreatePostContainer = (/*{ data }: { data: CreatePostProps }*/) => {
  const data = propsedDummy
  return (
    <div className="rounded-lg bg-background m-5">
      {/* 헤더 */}
      <div
        className={`collapse-title flex flex-col items-center bg-primary-container ${
          data.balance >= 0 ? 'bg-seesaw-blue-100' : 'bg-red-100'
        } rounded-t-lg p-5`}
      >
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
          {/* <FontAwesomeIcon icon={faEllipsis} className="text-outline" /> */}
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
        </div>
      </div>
      {/* 상세내역 */}
      <BoardSpendingHistory
        textColor={data.balance < 0 ? 'text-error' : 'text-primary'}
        targetPrice={data.missionTargetPrice}
        history={data.missionSpendingHistory}
        balance={data.balance}
      />
      {/* 인풋 영역 */}
      <div className="m-5">
        <textarea
          className="textarea textarea-primary w-full h-[215px] border-outline-container"
          placeholder="글 내용을 작성해주세요."
        />
      </div>
      <div className="grid grid-cols-2 gap-2 p-5">
        <Button color="error" label="취소" size="sm" onClick={() => {}} />
        <Button color="primary" label="등록하기" size="sm" onClick={() => {}} />
      </div>
    </div>
  )
}

export default CreatePostContainer
