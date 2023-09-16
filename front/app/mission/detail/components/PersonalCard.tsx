import { error } from 'console'
import Image from 'next/image'
interface missionResult {
  userImgUrl: string
  userName: string
  status: boolean
  spending: number
}

const PersonalCard = ({ data }: { data: missionResult }) => {
  return (
    <div className="flex flex-row gap-2 bg-background mb-2.5">
      <Image
        src={data.userImgUrl}
        alt="user profile image"
        width={38}
        height={38}
        className="rounded-full m-auto"
      />
      <div className="w-full flex-[2_1_0%]">
        <div className="text-sm mb-1">{data.userName}</div>
        <div
          className={`${data.status ? 'text-primary' : 'text-error'} text-xs`}
        >
          {data.status ? '성공' : '실패'}
        </div>
      </div>
      <div
        className={`${
          data.status ? 'text-primary' : 'text-error'
        } font-scDreamMedium w-full text-right m-auto flex-[1_1_0%]`}
      >
        {data.spending.toLocaleString('ko-KR')}원
      </div>
    </div>
  )
}

export default PersonalCard
