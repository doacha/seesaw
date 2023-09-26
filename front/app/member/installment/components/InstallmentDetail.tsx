const InstallmentDetail = () => {
  return (
    <div className="w-full p-5">
      <div className="flex flex-col gap-5">
        <div className="flex justify-between">
          <div>미션 카테고리 기존 소비 금액</div>
          <div>200,000원</div>
        </div>
        <div className="flex justify-between">
          <div>이번 주기 미션 카테고리 소비 금액</div>
          <div>150,000원</div>
        </div>
        <div className="h-[2px] w-full bg-primary"></div>
        <div className="flex justify-between font-scDreamMedium">
          <div>적금 가능 금액</div>
          <div className="flex items-end gap-2">
            <div className="text-sm">최대</div>
            <div className="text-xl font-scDreamExBold text-primary">
              50,000원
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InstallmentDetail
