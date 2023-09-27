'use client'

import ToggleCapsule from '@/app/components/ToggleCapsule'
import { categoryList } from '@/app/lib/constants'
import styles from '../styles/Home.module.css'

// Todo. category mapping이 전혀 안됨.
interface CategoryListProps {
  onClick: any
  state: boolean[]
}
const CategoryList = ({ onClick, state }: CategoryListProps) => {
  console.log('여기는 카테고리 리스트')
  // const onClick = (e: any) => {
  //   console.log(e.target.innerText)
  //   console.log('클릭')
  // }
  return (
    <div className={`overflow-auto ${styles.delScroll}`}>
      <div className="ml-3 mt-5 mb-5">
        <div className="carousel">
          {categoryList.map((element, idx) => (
            <ToggleCapsule
              onClick={() => {}}
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
