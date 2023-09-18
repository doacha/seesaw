import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

interface CategoryProps {
  category: number
}

const CategoryComponent: React.FC<CategoryProps> = ({ category }) => {
  const [clickCate, setClickCate] = useState(false)

  const clickCategory = () => {
    setClickCate(!clickCate)
    console.log('카테고리 클릭')
  }

  return (
    <div className="w-full flex flex-row gap-1 py-4 border-b-2 border-outline-container">
      <div className="w-28">
        <p className="font-scDreamExBold text-base">카테고리</p>
      </div>
      <div className="flex my-auto w-full justify-between">
        <p className="font-scDreamLight text-base">{category}</p>
        <div onClick={clickCategory} className="ml-1">
          {clickCate ? (
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

export default CategoryComponent
