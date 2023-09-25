import { categoryList } from '@/app/lib/constants'
import ToggleCapsule from './ToggleCapsule'
import type { MissionCreate } from '@/app/types'
import styles from '@/app/(mission)/mission/components/SearchContainer.module.css'
const CategoryInput = ({
  state,
  setState,
}: {
  state: MissionCreate
  setState: React.Dispatch<React.SetStateAction<MissionCreate>>
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
                value={idx}
                isSelected={idx === state.missionCategoryId}
                state={state}
                setState={setState}
                type="missionCategoryId"
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
