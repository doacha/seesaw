'use client'

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'

interface Props {
  value: number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const SpendingCostInput = ({ value, onChange }: Props) => {
  const [clickPen, setClickPen] = useState(false)

  const clickPencil = () => {
    setClickPen(!clickPen)
  }

  return (
    <div className="flex mb-14 flex-row gap-5">
      {clickPen ? (
        <input
          id="small-input"
          type="number"
          name="spendingCost"
          value={value || ''}
          onChange={onChange}
          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 "
        />
      ) : (
        <div className="flex flex-row">
          <p className="font-envR text-3xl">{value.toLocaleString('ko-KR')}</p>
          <span className="font-envR text-3xl">원</span>
        </div>
      )}
      <div className="flex my-auto" onClick={clickPencil}>
        <FontAwesomeIcon
          icon={faPencil}
          size="xl"
          style={{ color: '#001b2a' }}
        />
      </div>
    </div>
  )
}

export default SpendingCostInput
