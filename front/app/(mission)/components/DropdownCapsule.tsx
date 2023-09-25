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
  state: Array<boolean>
  title: string
  isList?: boolean
  type: number
}) => {
  const tailwindBorder = state.length === 0 ? 'border-[0.5px]' : 'border-0'
  const tailwindFontSize = isSmall
    ? 'text-[10px] h-4 py-[3px]'
    : 'text-sm h-[30px] py-2'
  console.log('asdf', getDropdownTitle(state, title, type))
  return (
    <span
      className={`badge px-[15px] ${
        capsuleColor.bg[getBgColor(state, type, isList ?? false)]
      } ${
        capsuleColor.text[state.length ? 'background' : 'black']
      } ${tailwindBorder} ${tailwindFontSize} ${className}`}
      onClick={onClick}
    >
      {'ffs'}
    </span>
  )
}
enum SearchType {
  Category,
  Period,
  Cycle,
}
const getBgColor = (state: Array<boolean>, type: number, isList: boolean) => {
  let numberOfSelect = 0
  let selectedIdx = -1
  state.forEach((element, idx) => {
    if (element) {
      numberOfSelect++
      selectedIdx = idx
    }
  })
  if (numberOfSelect === 0) {
    return 'background'
  }
  if (numberOfSelect === 1 && type === SearchType.Category) {
    return String(selectedIdx)
  }
  if (isList) {
    return 'primary-container'
  }
  return 'primary'
}
const getDropdownTitle = (
  state: Array<boolean>,
  title: string,
  type: number,
) => {
  let numberOfSelect = 0
  let selectedIdx = -1
  state.forEach((element, idx) => {
    if (element) {
      numberOfSelect++
      selectedIdx = idx
    }
  })
  console.log('???', title, numberOfSelect)
  if (numberOfSelect === 0) {
    console.log('sibal')
    return title
  } else if (numberOfSelect === 1) {
    switch (type) {
      case SearchType.Category:
        return categoryList[selectedIdx]
      case SearchType.Period:
        return missionPeriodArray[selectedIdx]
      default:
        return missionCycleArray[selectedIdx]
    }
  } else {
    return `${title} ${numberOfSelect}개`
  }
}
export default DropdownCapsule
