interface recordSpendngHistory {}

const SpendingHistory = ({
  history,
  targetPrice,
  balance,
  textColor,
}: {
  history: Array<{ recordHistory: string; recordPrice: number }>
  targetPrice: number
  balance: number
  textColor: string
}) => {
  return (
    <div className="collapse-content p-0">
      <div className="flex justify-between mb-2">
        <span className="font-scDreamExBold">미션금액</span>
        <span>{targetPrice.toLocaleString('ko-KR')}</span>
      </div>
      <hr className="border-outline mb-2" />
      {history.map((element, idx) => (
        <div className="flex justify-between mb-2" key={idx}>
          <span>{element.recordHistory}</span>
          <span>{element.recordPrice.toLocaleString('ko-KR')}</span>
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
