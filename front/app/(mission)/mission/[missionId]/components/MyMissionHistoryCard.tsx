import { getCycleTerm } from '../../../util'
interface CycleResult {
  cycleCount: number
  spendingRecord: Array<{ recordName: string; recordPrice: number }>
}

const MyMissionHistoryCard = ({
  data,
  startDate,
  missionPeriod,
  missionTargetPrice,
}: {
  data: CycleResult
  startDate: string
  missionPeriod: number
  missionTargetPrice: number
}) => {
  //   const newRecord = [...data.spendingRecord]
  //   const sumOfSpending = newRecord.reduce((accu, curr) => {
  //     accu.recordPrice += curr.recordPrice
  //     return accu
  //   }).recordPrice
  let sumOfSpending = 0
  data.spendingRecord.forEach(
    (element) => (sumOfSpending += element.recordPrice),
  )
  const isSuccess = sumOfSpending <= missionTargetPrice
  return (
    <div className="my-2.5 mb-5 p-2 shadow-md rounded-lg">
      {/* 제목 */}
      <div className="mb-[10px]">
        <span
          className={`${
            isSuccess ? 'text-primary' : 'text-error'
          } font-scDreamExBold mr-[10px]`}
        >
          {isSuccess ? '성공' : '실패'}
        </span>
        <span className="font-scDreamExBold mr-[10px]">
          {data.cycleCount}회차
        </span>
        <span className="text-[10px] text-outline">
          {getCycleTerm(startDate, data.cycleCount, missionPeriod)}
        </span>
      </div>
      {/* 상세목록 */}
      {data.spendingRecord.map((element, idx) => (
        <div className="md-[5px] flex justify-between" key={idx}>
          <span>{element.recordName}</span>
          <span>{element.recordPrice.toLocaleString('ko-KR')}</span>
        </div>
      ))}
      <hr className="my-[10px]" />
      <div className="text-right font-scDreamExBold">
        {sumOfSpending.toLocaleString('ko-KR')}
      </div>
    </div>
  )
}

export default MyMissionHistoryCard
