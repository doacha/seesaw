'use client'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

// 썅 오늘 날짜에 새로운 데이터 추가할때 새로 체크하는 데이터를 백엔드로 보내는 새로운 로직이 그지 같아 왜 toISOstring그지 같은 친구가 왜 작동을 안하냐
interface Props {
  value: Date
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const DateInput = ({ value, onChange }: Props) => {
  const [clickDa, setClickDa] = useState(false)
  const clickDate = () => {
    setClickDa(!clickDa)
  }
  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
    }
    const formatter = new Intl.DateTimeFormat('ko-KR', options)
    return formatter.format(date)
  }

  return (
    <div className="w-full flex flex-row gap-1 py-4 border-b-2 border-outline-container">
      <div className="w-28">
        <p className="font-scDreamExBold text-base">날짜</p>
      </div>
      <div className="flex my-auto w-full justify-between">
        {!clickDa ? (
          <p className="my-auto font-scDreamLight text-xs">
            {formatDate(value)}
          </p>
        ) : (
          <input
            className="w-full mr-5 font-scDreamLight text-xs"
            type="datetime-local"
            name="spendingDate"
            onChange={onChange}
          ></input>
        )}
        <div onClick={clickDate} className="ml-1">
          {!clickDa ? (
            <FontAwesomeIcon
              icon={faChevronRight}
              style={{ color: '#001b2a' }}
            />
          ) : (
            <FontAwesomeIcon
              icon={faChevronRight}
              style={{ color: '#001b2a' }}
              rotation={90}
            />
          )}
        </div>
      </div>
    </div>
  )
}
export default DateInput
