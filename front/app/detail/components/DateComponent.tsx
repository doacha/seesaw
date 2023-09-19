import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

interface DateProps {
  date: string
}

const DateComponent: React.FC<DateProps> = ({ date }) => {
  const [clickDa, setClickDa] = useState(false)

  const clickDate = () => {
    setClickDa(!clickDa)
  }

  return (
    <div className="w-full flex flex-row gap-1 py-4 border-b-2 border-outline-container">
      <div className="w-28">
        <p className="font-scDreamExBold text-base my-auto">날짜</p>
      </div>
      <div className="flex my-auto w-full justify-between">
        {clickDa ? (
          <p className="my-auto font-scDreamLight text-xs">{date}</p>
        ) : (
          <input
            className="w-full mr-5 font-scDreamLight text-xs"
            type="datetime-local"
          />
        )}
        <div onClick={clickDate} className="ml-1">
          {clickDa ? (
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

export default DateComponent
