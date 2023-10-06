const InstallmentInfo = () => {
  return (
    <div className="bg-primary w-full p-5 flex flex-col gap-[60px]">
      <div className="flex flex-col gap-2">
        <div className="flex font-scDreamMedium self-center gap-2 items-center">
          <div className="">
            <img src="../logo_light.png" className="w-[38px]"></img>
          </div>
          <div className="flex text-[30px] text-background">시소적금</div>
        </div>
        <div className="font-scDreamMedium text-[26px] text-background">
          미션 주기별로 절약한 금액을 <br />
          자유롭게 저축해보세요!
        </div>
      </div>
      <div className="flex items-center justify-around">
        <div className="flex flex-col items-center">
          <div className="text-background">연 이율</div>
          <div className="flex items-end text-2xl text-background font-scDreamExBold">
            2<div className="text-base">%</div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-background">출금 가능 횟수</div>
          <div className="text-2xl text-background font-scDreamExBold">
            무제한
          </div>
        </div>
      </div>
    </div>
  )
}

export default InstallmentInfo
