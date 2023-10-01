import { RecordList } from '@/app/types'

const SpendingHistory = ({
  history,
  targetPrice,
  balance,
  textColor,
}: {
  history:
    | Array<{
        recordName: string
        recordCost: number
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
        history.map((element, idx) => (
          <div className="flex justify-between mb-2" key={idx}>
            <span>{element.recordName}</span>
            <span>{element.recordCost.toLocaleString('ko-KR')}</span>
          </div>
        ))}
      <hr className="border-outline" />
      <div className="flex justify-between font-scDreamExBold mt-2">
        <span>잔액</span>
        <span className={textColor}>{balance.toLocaleString('ko-KR')}</span>
      </div>
    </div>
  )
}

export default SpendingHistory
