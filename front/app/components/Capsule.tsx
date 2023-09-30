'use client'
//////////////////////////////////////////////////////
// Capsule : 클릭 등 유저의 액션에 대한 변화가 없는 캡슐, 그러나 필요시 onClick에 로직 전달은 가능
// bcColor (배경색) 과 textColor(폰트색) 은 색상 이름을 props로 전달합니다.
// 카테고리 관련 색상은 카테고리 인덱스만 넘겨줍니다.
// isSmall : 작은 버튼 생성시 true 전달 (미션 파트에서 사용)
// isHasBorder : border 존재할 경우 true 전달 (미션 파트에서 사용)
// onClick : onClick 함수 전달
// className : 추가적으로 필요한 css 있으면 전달
// changeable : 클릭하면 색깔이 바뀌는 캡슐인 경우 true 전달
//////////////////////////////////////////////////////
import { capsuleColor } from '../lib/constants'
const Capsule = ({
  bgColor,
  textColor,
  isHasBorder,
  isSmall,
  onClick,
  children,
  className,
}: {
  bgColor: string
  textColor: string
  isHasBorder?: boolean
  isSmall?: boolean
  onClick?: any
  children: string
  className?: string
  value?: number
}) => {
  const tailwindBorder = isHasBorder ? 'border-[0.5px]' : 'border-0'
  const tailwindFontSize = isSmall
    ? 'text-[10px] h-4 py-[3px]'
    : 'text-sm h-[30px] py-2'

  return (
    <span
      className={`badge px-[15px] ${capsuleColor.bg[bgColor]} ${capsuleColor.text[textColor]} ${tailwindBorder} ${tailwindFontSize} ${className}`}
      onClick={onClick}
    >
      {children}
    </span>
  )
}

export default Capsule
