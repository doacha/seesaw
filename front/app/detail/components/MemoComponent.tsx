import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

interface MemoProps {
  memo: string
}

const MemoComponent: React.FC<MemoProps> = ({ memo }) => {
  return (
    <div className="w-full flex flex-row gap-1 py-4 border-b-2 border-outline-container">
      <div className="w-28">
        <p className="font-scDreamExBold text-base">메모</p>
      </div>
      <div className="flex my-auto w-full justify-between">
        <p className="font-scDreamLight text-sm">{memo}</p>
        <div className="ml-1">
          <FontAwesomeIcon icon={faChevronRight} style={{ color: '#001b2a' }} />
        </div>
      </div>
    </div>
  )
}

export default MemoComponent
