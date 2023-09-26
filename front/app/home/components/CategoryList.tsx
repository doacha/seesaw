'use client'

import ToggleCapsule from '@/app/components/ToggleCapsule'
import { categoryList } from '@/app/lib/constants'
import styles from '../styles/Home.module.css'

// Todo. category mapping이 전혀 안됨.
interface CategoryListProps {
  onClick: any
}
const CategoryList = ({ onClick }: CategoryListProps) => {
  // const onClick = (e: any) => {
  //   console.log(e.target.innerText)
  //   console.log('클릭')
  // }
  return (
    <div className="ml-3">
      <div className={`mt-5 overflow-scroll ${styles.delScroll}`}>
        <div className="carousel">
          {categoryList.map((element, idx) => (
            <ToggleCapsule
              onClick={() => {}}
              className="carousel-item mr-[15px] h-[14px]"
              bgColor="background-fill"
              textColor={`${idx}`}
              isSelected={true}
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
