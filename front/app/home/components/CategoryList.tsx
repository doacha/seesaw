'use client'

import ToggleCapsule from '@/app/components/ToggleCapsule'
import { categoryList } from '@/app/lib/constants'
import styles from './Home.module.css'
// interface CategoryListProps {
//   onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
// }
interface CategoryListProps {
  onClick: any
}
const CategoryList = ({ onClick }: { onClick: any }) => {
  // const onClick = (e: any) => {
  //   console.log(e.target.innerText)
  //   console.log('클릭')
  // }
  return (
    <div className="ml-3">
      <div className={`mt-3 overflow-scroll ${styles.delScroll}`}>
        <div className="carousel">
          {categoryList.map((element, idx) => (
            <ToggleCapsule
              onClick={onClick}
              className="carousel-item mr-[15px] h-[14px]"
              bgColor="background-fill"
              textColor={`${idx}`}
              key={idx}
              value={idx}
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
