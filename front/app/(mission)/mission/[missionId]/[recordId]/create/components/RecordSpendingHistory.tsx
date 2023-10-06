const BoardSpendingHistory = ({
  history,
  targetPrice,
  balance,
  textColor,
}: {
  history: Array<{ spendingTitle: string; spendingCost: number }>
  targetPrice: number
  balance: number
  textColor: string
}) => {
  return (
    <div className="px-5 py-5">
      <div className="flex justify-between mb-2">
        <span className="font-scDreamExBold">미션금액</span>
        <span>{targetPrice.toLocaleString('ko-KR')}</span>
      </div>
      <hr className="border-outline mb-2" />
      {history.map((element, idx) => (
        <div className="flex justify-between mb-2 text-sm" key={idx}>
          <span>{element.spendingTitle}</span>
          <span>{element.spendingCost.toLocaleString('ko-KR')}</span>
        </div>
      ))}
      <hr className="border-outline" />
      <div className="flex justify-between font-scDreamExBold mt-2">
        {balance < 0 ? (
          <span className="text-error">실패</span>
        ) : (
          <span className={textColor}>성공</span>
        )}
        <span>{balance.toLocaleString('ko-KR')}</span>
      </div>
    </div>
  )
}

export default BoardSpendingHistory
