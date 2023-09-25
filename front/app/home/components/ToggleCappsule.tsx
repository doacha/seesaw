'use client'
////////////////////////////////////////////////////////////////////////////////////////////////
// ToggleCapsule : 클릭 여부에 따라 배경색이 변하는 캡슐
// bcColor (배경색) 과 textColor(폰트색) 은 색상 이름을 props로 전달합니다. 카테고리 관련 색상은
// 카테고리 인덱스만 넘겨줍니다.
// isSmall : 작은 버튼 생성시 true 전달 (미션 파트에서 사용)
// isHasBorder : border 존재할 경우 true 전달 (미션 파트에서 사용)
// onClick : onClick 함수 전달, SearchContainer의 43번째 줄 handleCapsuleClick 참고
// className : 추가적으로 필요한 css 있으면 전달
// value : 해당 캡슐에 할당된 인덱스 데이터
// select : 선택된 상태인지 여부에 대한 초기값 설정
// type : 캡슐에 저장되는 데이터의 종류, 미션 파트에서만 사용
////////////////////////////////////////////////////////////////////////////////////////////////
import { capsuleColor } from '@/app/lib/constants'
import type { Spending } from '@/app/types'
const ToggleCapsule = ({
  bgColor,
  textColor,
  isHasBorder,
  isSmall,
  children,
  className,
  value,
  isSelected,
  setState,
  state,
  type,
}: {
  bgColor: string
  textColor: string
  isHasBorder?: boolean
  isSmall?: boolean
  onClick?: any
  children: string
  className?: string
  value: number
  select?: boolean
  isSelected: boolean
  setState: React.Dispatch<React.SetStateAction<Spending>>
  state: Spending
  type: string
}) => {
  let backgroundColor
  let fontColor

  const handleClick = () => {
    if (isSelected) {
      setState({ ...state, [type]: -1 })
    } else {
      setState({ ...state, [type]: value })
    }
  }

  if (!isSelected) {
    backgroundColor = bgColor
    fontColor = textColor
  } else {
    if (textColor === 'black') {
      backgroundColor = 'primary-containar'
      fontColor = 'black'
    } else {
      backgroundColor = textColor
      fontColor = 'background'
    }
  }

  const tailwindBorder = isHasBorder ? 'border-[0.5px]' : 'border-0'
  const tailwindFontSize = isSmall
    ? 'text-[10px] h-4 py-[3px]'
    : 'text-sm h-[30px]'

  return (
    <span
      className={`badge px-[15px] ${
        isSelected
          ? capsuleColor.bg[
              textColor === 'black' ? 'primary-container' : textColor
            ]
          : capsuleColor.bg[backgroundColor]
      } ${
        isSelected
          ? capsuleColor.text['background']
          : capsuleColor.text[fontColor]
      } ${tailwindBorder} ${tailwindFontSize} ${className}`}
      onClick={handleClick}
    >
      {children}
    </span>
  )
}

export default ToggleCapsule
