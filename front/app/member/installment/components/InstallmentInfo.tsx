const InstallmentInfo = () => {
  return (
    <div className="bg-primary w-full p-5 flex flex-col gap-5">
      <div className="flex flex-col">
        <div className="font-scDreamMedium text-xl text-background">
          시소적금
        </div>
        <div className="font-scDreamMedium text-[26px] text-background">
          미션을 성공하고 절약한 금액을 <br />
          저축해보세요!
        </div>
      </div>
      <div className="flex items-center justify-around">
        <div className="flex flex-col items-center">
          <div className="text-background">연 이율</div>
          <div className="text-2xl text-background font-scDreamExBold">2%</div>
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
