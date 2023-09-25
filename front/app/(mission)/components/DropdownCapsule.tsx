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
  state: Array<number>
  title: string
  isList?: boolean
  type: number
}) => {
  const tailwindBorder = state.length === 0 ? 'border-[0.5px]' : 'border-0'
  const tailwindFontSize = isSmall
    ? 'text-[10px] h-4 py-[3px]'
    : 'text-sm h-[30px] py-2'

  return (
    <span
      className={`badge px-[15px] ${
        capsuleColor.bg[getBgColor(state, type, isList ?? false)]
      } ${
        capsuleColor.text[state.length ? 'background' : 'black']
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
const getBgColor = (state: Array<number>, type: number, isList: boolean) => {
  if (state.length === 0) {
    return 'background'
  }
  if (state.length === 1 && type === SearchType.Category) {
    return String(state[0])
  }
  if (isList) {
    return 'primary-container'
  }
  return 'primary'
}
const getDropdownTitle = (
  state: Array<number>,
  title: string,
  type: number,
) => {
  if (state.length === 0) {
    return title
  } else if (state.length === 1) {
    switch (type) {
      case SearchType.Category:
        return categoryList[state[0]]
      case SearchType.Period:
        return missionPeriodArray[state[0]]
      default:
        return missionCycleArray[state[0]]
    }
  } else {
    return `${title} ${state.length}개`
  }
}
export default DropdownCapsule
