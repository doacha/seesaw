import { categoryList } from '@/app/lib/constants'
import ToggleCapsule from '@/app/components/ToggleCapsule'
import type { MissionCreate } from '@/app/types'
import styles from '@/app/(mission)/mission/components/SearchContainer.module.css'
const CategoryInput = ({
  state,
  handleClick,
}: {
  state: MissionCreate
  handleClick: any
}) => {
  return (
    <div className={`overflow-auto ${styles.delScroll}`}>
      <div className="font-scDreamExBold mb-5">
        미션 카테고리를 선택해주세요.
      </div>
      <div className="carousel">
        {categoryList.map(
          (element, idx) =>
            idx > 0 && (
              <ToggleCapsule
                className="carousel-item mr-[15px] h-[14px]"
                bgColor="background-fill"
                textColor={`${idx}`}
                key={idx}
                isSelected={idx === state.missionCategoryId}
                onClick={() =>
                  handleClick(
                    idx,
                    idx === state.missionCategoryId,
                    'missionCategoryId',
                  )
                }
              >
                {element}
              </ToggleCapsule>
            ),
        )}
      </div>
    </div>
  )
}

export default CategoryInput
