import { error } from 'console'
import Image from 'next/image'
import { RecordDetail } from '@/app/types'
import { useRouter } from 'next/navigation'
import { recordListStore } from '@/stores/recordListStore'

const PersonalCard = ({ data }: { data: RecordDetail }) => {
  const router = useRouter()
  const { recordStatus } = recordListStore()
  return (
    <div
      className="flex flex-row gap-2 bg-background mb-5"
      onClick={() => router.push(`${recordStatus.missionId}/${data.recordId}`)}
    >
      <Image
        src={data.memberImgUrl ?? '/default_profile.svg'}
        alt="member profile img"
        width={40}
        height={40}
        className="rounded-full m-auto w-[40px] h-[40px]"
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
