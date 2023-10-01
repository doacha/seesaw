import { getCycleTerm } from '../../../util'
import { GroupStatusProps } from '@/app/types'
import Link from 'next/link'
enum Property {
  'recordNumber',
  'recordStartDate',
  'recordEndDate',
  'recordStatus',
  'recordList',
}

interface MyRecordHistory {
  0: number
  1: string
  2: string
  3: number
  4: Array<any>
  [key: number]: any
}

const MyMissionHistoryCard = ({
  data,
  propsData,
}: {
  data: Array<any>
  propsData: GroupStatusProps
}) => {
  let recordList = []
  let sumOfSpending = 0
  for (let i = 4; i < data.length; i++) {
    recordList.push(data[i])
    sumOfSpending += data[i][1]
  }
  return (
    <Link href={`${propsData.missionId}/${data[Property.recordNumber]}`}>
      <div className="my-2.5 mt-5 p-2 shadow-md rounded-lg">
        {/* 제목 */}
        <div className="mb-[10px]">
          <span
            className={`${
              data[Property.recordStatus] !== 2 ? 'text-primary' : 'text-error'
            } font-scDreamExBold mr-[10px]`}
          >
            {data[Property.recordStatus] !== 2 ? '성공' : '실패'}
          </span>
          <span className="font-scDreamExBold mr-[10px]">
            {data[Property.recordNumber]}회차
          </span>
          <span className="text-[10px] text-outline">
            {getCycleTerm(
              propsData.missionStartDate,
              data[Property.recordNumber],
              propsData.missionPeriod,
            )}
          </span>
        </div>
        {/* 상세목록 */}
        {recordList.map((element, idx) => (
          <div className="md-[5px] flex justify-between" key={idx}>
            <span>{element[0]}</span>
            <span>{element[1].toLocaleString('ko-KR')}</span>
          </div>
        ))}
        <hr className="my-[10px]" />
        <div className="text-right font-scDreamExBold">
          {sumOfSpending.toLocaleString('ko-KR')}
        </div>
      </div>
    </Link>
  )
}

export default MyMissionHistoryCard
