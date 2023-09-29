import { error } from 'console'
import Image from 'next/image'
import { RecordDetail } from '@/app/types'
const PersonalCard = ({ data }: { data: RecordDetail }) => {
  return (
    <div className="flex flex-row gap-2 bg-background mb-2.5">
      <Image
        src={data.memberImgUrl}
        alt="member profile image"
        width={38}
        height={38}
        className="rounded-full m-auto"
      />
      <div className="w-full flex-[2_1_0%]">
        <div className="text-sm mb-1">{data.memberNickname}</div>
        <div
          className={`${
            data.recordStatus === 1 ? 'text-primary' : 'text-error'
          } text-xs`}
        >
          {data.recordStatus === 1 ? '성공' : '실패'}
        </div>
      </div>
      <div
        className={`${
          data.recordStatus === 1 ? 'text-primary' : 'text-error'
        } font-scDreamMedium w-full text-right m-auto flex-[1_1_0%]`}
      >
        {data.recordTotalCost.toLocaleString('ko-KR')}원
      </div>
    </div>
  )
}

export default PersonalCard
