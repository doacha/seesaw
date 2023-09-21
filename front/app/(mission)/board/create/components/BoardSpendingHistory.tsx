import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
interface recordSpendngHistory {}

const BoardSpendingHistory = ({
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
    <div className="px-5 py-5">
      <div className="text-right text-[10px] text-outline mb-2">
        내역 수정
        <FontAwesomeIcon icon={faChevronRight} className="ml-2 text-black" />
      </div>
      <div className="flex justify-between mb-2">
        <span className="font-scDreamExBold">미션금액</span>
        <span>{targetPrice.toLocaleString('ko-KR')}</span>
      </div>
      <hr className="border-outline mb-2" />
      {history.map((element, idx) => (
        <div className="flex justify-between mb-2 text-sm" key={idx}>
          <span>{element.recordHistory}</span>
          <span>{element.recordPrice.toLocaleString('ko-KR')}</span>
        </div>
      ))}
      <hr className="border-outline" />
      <div className="flex justify-between font-scDreamExBold mt-2">
        <span className={textColor}>성공</span>
        <span>{balance.toLocaleString('ko-KR')}</span>
      </div>
    </div>
  )
}

export default BoardSpendingHistory
