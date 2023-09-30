import ToggleCapsule from '@/app/components/ToggleCapsule'
import { categoryList } from '@/app/lib/constants'
type Props = {
  selectedCategoryId: number
  handleCategoryClick: (idx: number) => void
}
const CategoryInput = ({ selectedCategoryId, handleCategoryClick }: Props) => {
  return (
    <div className="w-full flex flex-row gap-1 py-4 border-b-2 border-outline-container">
      <div className="w-20 my-auto">
        <div className="w-20">
          <p className="font-scDreamExBold text-base">카테고리</p>
        </div>
      </div>
      <div className="flex my-auto w-full justify-between">
        <div className="carousel">
          {categoryList.map((element, idx) =>
            idx > 0 ? (
              <ToggleCapsule
                className="carousel-item mr-[15px] h-[14px]"
                bgColor="background-fill"
                textColor={`${idx}`}
                key={idx}
                isSelected={idx === selectedCategoryId}
                onClick={() => handleCategoryClick(idx)}
              >
                {element}
              </ToggleCapsule>
            ) : null,
          )}
        </div>
      </div>
    </div>
  )
}

export default CategoryInput
