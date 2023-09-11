'use client'
import { useState } from 'react'

const Dropdown = () => {
  const [currentSort, setCurrentSort] = useState('최신순')

  const onSortButtonClick = (value: string) => {
    setCurrentSort(value)
    const box = document.getElementById('sortOpen') as HTMLInputElement
    box.checked = false
  }

  return (
    <div tabIndex={0} className="collapse collapse-arrow bg-background-fill">
      <input type="checkbox" className="h-[40px] min-h-0" id="sortOpen" />
      <div className="collapse-title text-base pr-10 h-[40px]  min-h-0 pt-2">
        {currentSort}
      </div>
      <div className="w-20 collapse-content">
        <button
          className="text-left"
          onClick={() => {
            onSortButtonClick('최신순')
          }}
        >
          최신순
        </button>
        <button
          className="w-20 text-left"
          onClick={() => onSortButtonClick('성공')}
        >
          성공
        </button>
        <button
          className="w-20 text-left"
          onClick={() => onSortButtonClick('실패')}
        >
          실패
        </button>
      </div>
    </div>
  )
}

export default Dropdown
