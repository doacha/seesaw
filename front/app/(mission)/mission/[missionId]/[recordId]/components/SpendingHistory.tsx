import { RecordList } from '@/app/types'

const SpendingHistory = ({
  history,
  targetPrice,
  balance,
  textColor,
}: {
  history:
    | Array<{
        spendingTitle: string
        spendingCost: number
      }>
    | undefined
  targetPrice: number
  balance: number
  textColor: string
}) => {
  return (
    <div className="collapse-content p-0">
      <div className="flex justify-between mb-5">
        <span className="font-scDreamExBold">미션금액</span>
        <span>{targetPrice.toLocaleString('ko-KR')}</span>
      </div>
      {history &&
        history.length > 0 &&
        history.map((element, idx) => (
          <div className="flex justify-between mb-2" key={idx}>
            <span>{element.spendingTitle}</span>
            <span>{element.spendingCost.toLocaleString('ko-KR')}</span>
          </div>
        ))}
      {history && history.length === 0 && (
        <div className="text-center mb-2.5">거래 내역이 없습니다.</div>
      )}
      <hr className="border-outline" />
      <div className="flex justify-between font-scDreamExBold mt-2">
        <span>잔액</span>
        <span className={textColor}>{balance.toLocaleString('ko-KR')}</span>
      </div>
    </div>
  )
}

export default SpendingHistory
