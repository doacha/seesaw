import Image from 'next/image'
interface TodayStatus {
  memberImgUrl: string
  memberNickname: string
  recordSuccessCount: number
  recordTotalCost: number
  recordStatus: number
  recordId: number
}

const GroupStatusTodayCard = ({
  data,
  targetPrice,
  onClick,
}: {
  data: TodayStatus
  targetPrice: number
  onClick: any
}) => {
  return (
    <div
      onClick={onClick}
      className="carousel-item flex flex-col rounded-[25px] bg-background w-[124px] h-[229px] mr-5 drop-shadow-md"
    >
      {/* 카드 상단 - 프로필 */}
      <div
        className={`${
          data.recordStatus === 2 ? 'bg-seesaw-red-100' : 'bg-seesaw-blue-100'
        } rounded-t-[25px] pt-[25px] pb-2 h-[140px]"`}
      >
        <Image
          src={data.memberImgUrl ?? '/default_profile.svg'}
          width={65}
          height={65}
          alt="member profile image"
          className="rounded-full m-auto"
        />
        <div className="text-sm text-center mt-[7px]">
          {data.memberNickname}
        </div>
        <div className="text-[10px] text-outline text-center m-auto">
          성공 {data.recordSuccessCount} 회
        </div>
      </div>
      {/* 카드 하단 - 지출내역 */}
      <div className="m-auto">
        <div className="px-[20px] mb-2.5 flex justify-between">
          <span className="text-[10px] mr-2">지출</span>
          <span className="font-scDreamExBold text-error">
            {data.recordTotalCost.toLocaleString('ko-KR')}
          </span>
        </div>
        <div className="px-[20px] flex justify-between">
          <span className="text-[10px] mr-2">잔액</span>
          <span className="font-scDreamExBold text-primary">
            {(targetPrice - data.recordTotalCost >= 0
              ? targetPrice - data.recordTotalCost
              : 0
            ).toLocaleString('ko-KR')}
          </span>
        </div>
      </div>
    </div>
  )
}

export default GroupStatusTodayCard
