'use client'
// bcColor (배경색) 과 textColor(폰트색) 은 색상 이름을 props로 전달합니다. 카테고리 관련 색상은
// 카테고리 인덱스만 넘겨줍니다.
// isSmall : 작은 버튼 생성시 true 전달 (미션 파트에서 사용)
// isHasBorder : border 존재할 경우 true 전달 (미션 파트에서 사용)
// onClick : onClick 함수 전달
// className : 추가적으로 필요한 css 있으면 전달
// changeable : 클릭하면 색깔이 바뀌는 캡슐인 경우 true 전달
import {
  capsuleColor,
  categoryList,
  missionCycleArray,
  missionPeriodArray,
} from '@/app/lib/constants'
const DropdownCapsule = ({
  isSmall,
  onClick,
  className,
  state,
  title,
  type,
  isList,
}: {
  isSmall?: boolean
  onClick?: any
  className?: string
  changeable?: boolean
  state: number
  title: string
  isList?: boolean
  type: number
}) => {
  const tailwindBorder = state === -1 ? 'border-[0.5px]' : 'border-0'
  const tailwindFontSize = isSmall
    ? 'text-[10px] h-4 py-[3px]'
    : 'text-sm h-[30px] py-2'

  return (
    <span
      className={`badge px-[15px] ${
        capsuleColor.bg[getBgColor(state, type, isList ?? false)]
      } ${
        capsuleColor.text[state !== -1 ? 'background' : 'black']
      } ${tailwindBorder} ${tailwindFontSize} ${className}`}
      onClick={onClick}
    >
      {getDropdownTitle(state, title, type)}
    </span>
  )
}
enum SearchType {
  Category,
  Period,
  Cycle,
}
const getBgColor = (state: number, type: number, isList: boolean) => {
  if (state === -1) {
    return 'background'
  }
  if (type === SearchType.Category) {
    return String(state)
  }
  if (isList) {
    return 'primary-container'
  }
  return 'primary'
}
const getDropdownTitle = (state: number, title: string, type: number) => {
  if (state === -1) {
    return title
  } else {
    switch (type) {
      case SearchType.Category:
        return categoryList[state]
      case SearchType.Period:
        return missionPeriodArray[state]
      default:
        return missionCycleArray[state]
    }
  }
}
export default DropdownCapsule
