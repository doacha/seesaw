import { Record } from '@/app/types'

interface Props {
  record: Record
}

const RecordCard = (props: Props) => {
  const getTxtColor = (value: number) => {
    if (value === 1) {
      return 'text-primary'
    } else if (value === 2) {
      return 'text-error'
    } else {
      return ''
    }
  }

  const getStatus = (value: number) => {
    if (value === 0) {
      return '진행중'
    } else if (value === 1) {
      return '성공'
    } else {
      return '실패'
    }
  }

  return (
    <div className="p-[10px] bg-background-fill flex justify-between items-center rounded-lg">
      <div className="flex flex-col">
        <div className="flex gap-2">
          <div>{props.record.recordNumber}회차</div>
          <div className={getTxtColor(props.record.recordStatus)}>
            {props.record.recordTotalCost}원
          </div>
        </div>
        <div className="text-xs text-outline">
          {props.record.startDate} ~ {props.record.endDate}
        </div>
        {props.record.recordContent ? (
          <div className="text-sm text-outline">
            {props.record.recordContent}
          </div>
        ) : (
          <div className="text-sm text-outline">
            게시글이 작성되지 않은 회차입니다.
          </div>
        )}
      </div>
      <div className={getTxtColor(props.record.recordStatus)}>
        {getStatus(props.record.recordStatus)}
      </div>
    </div>
  )
}

export default RecordCard
