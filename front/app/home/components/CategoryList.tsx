'use client'

import ToggleCapsule from '@/app/components/ToggleCapsule'
import { categoryList } from '@/app/lib/constants'
import styles from '../styles/Home.module.css'

interface CategoryListProps {
  onClick: any
  state: boolean[]
}
const CategoryList = ({ onClick, state }: CategoryListProps) => {
  return (
    <div className={`overflow-auto ${styles.delScroll}`}>
      <div className="ml-3 mt-5 mb-5">
        <div className="carousel">
          {categoryList.map((element, idx) => (
            <ToggleCapsule
              key={idx}
              onClick={() => onClick(idx, state[idx])}
              className="carousel-item mr-[15px] h-[14px]"
              bgColor="background-fill"
              textColor={`${idx}`}
              isSelected={state[idx]}
            >
              {element}
            </ToggleCapsule>
          ))}
        </div>
      </div>
    </div>
  )
}
export default CategoryList
