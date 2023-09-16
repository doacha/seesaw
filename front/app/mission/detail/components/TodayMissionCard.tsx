import Image from 'next/image'

interface TodayStatus {
  userImgUrl: string
  userName: string
  successCount: number
  spending: number
  balance: number
}

const TodayMissionCard = ({
  data,
  targetPrice,
  onClick,
}: {
  data: TodayStatus
  targetPrice: number
  onClick: any
}) => {
  console.log(targetPrice, data.spending)
  return (
    <div className="carousel-item flex flex-col rounded-[25px] bg-background w-[124px] h-[229px] mr-5 drop-shadow-md">
      {/* 카드 상단 - 프로필 */}
      <div
        className={`${
          targetPrice < data.spending
            ? 'bg-seesaw-red-100'
            : 'bg-seesaw-blue-100'
        } rounded-t-[25px] pt-[25px] pb-2 h-[140px]"`}
      >
        <Image
          src={data.userImgUrl}
          width={65}
          height={65}
          alt="user profile image"
          className="rounded-full m-auto"
        />
        <div className="text-sm text-center mt-[7px]">{data.userName}</div>
        <div className="text-[10px] text-outline text-center m-auto">
          성공 {data.successCount} 회
        </div>
      </div>
      {/* 카드 하단 - 지출내역 */}
      <div className="m-auto">
        <div className="px-[20px] mb-2.5">
          <span className="text-[10px] mr-2">지출</span>
          <span className="font-scDreamExBold text-error">
            {data.spending.toLocaleString('ko-KR')}
          </span>
        </div>
        <div className="px-[20px]">
          <span className="text-[10px] mr-2">잔액</span>
          <span className="font-scDreamExBold text-primary">
            {data.balance.toLocaleString('ko-KR')}
          </span>
        </div>
      </div>
    </div>
  )
}

export default TodayMissionCard
