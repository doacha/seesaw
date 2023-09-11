'use client'
import { useState } from 'react'
import '../user/styles/style.css'

const Dropdown = () => {
  const [currentSort, setCurrentSort] = useState('최신순')

  const onSortButtonClick = (value: string) => {
    setCurrentSort(value)
    const box = document.getElementById('sortOpen') as HTMLInputElement
    box.checked = false
    console.log(box.checked)
  }

  return (
    <div
      tabIndex={0}
      className="collapse collapse-arrow bg-white absolute top-0 right-0"
    >
      <input
        type="checkbox"
        className="h-[40px] min-h-0 w-full"
        id="sortOpen"
      />
      <div className="collapse-title text-base h-[40px] min-h-0 w-full text-left px-3 py-2">
        {currentSort}
      </div>
      <div className=" collapse-content">
        <p
          className="text-left"
          onClick={() => {
            onSortButtonClick('최신순')
          }}
        >
          최신순
        </p>
        <p className="text-left" onClick={() => onSortButtonClick('성공')}>
          성공
        </p>
        <p className="text-left" onClick={() => onSortButtonClick('실패')}>
          실패
        </p>
      </div>
    </div>
  )
}

export default Dropdown
