// bcColor (배경색) 과 textColor(폰트색) 은 tailwindCSS 형식으로 필수적으로 입력해줍니다
// isSmall : 작은 버튼 생성시 true 전달 (미션 파트에서 사용)
// isHasBorder : border 존재할 경우 true 전달 (미션 파트에서 사용)
// onClick : onClick 함수 전달

const Capsule = ({
  bgColor,
  textColor,
  isHasBorder,
  isSmall,
  onClick,
  children,
}: {
  bgColor: string
  textColor: string
  isHasBorder?: boolean
  isSmall?: boolean
  onClick?: any
  children: string
}) => {
  const tailwindBorder = isHasBorder ? 'border-[0.5px]' : 'border-0'
  const tailwindFontSize = isSmall
    ? 'text-[10px] h-4 py-[3px]'
    : 'text-sm h-[30px] py-2'

  return (
    <span
      className={`badge ${bgColor} ${textColor} ${tailwindBorder} ${tailwindFontSize}`}
      onClick={onClick}
    >
      {children}
    </span>
  )
}

export default Capsule
