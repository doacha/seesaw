'use client'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
interface Props {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const DateInput = ({ value, onChange }: Props) => {
  const [clickDa, setClickDa] = useState(false)
  const clickDate = () => {
    setClickDa(!clickDa)
  }

  return (
    <div className="w-full flex flex-row gap-1 py-4 border-b-2 border-outline-container">
      <div className="w-28">
        <p className="font-scDreamExBold text-base">날짜</p>
      </div>
      <div className="flex my-auto w-full justify-between">
        {!clickDa ? (
          <p className="my-auto font-scDreamLight text-xs">{value}</p>
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
