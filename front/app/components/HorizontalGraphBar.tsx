interface Props {
  title: string
  length: string
  amount: number
  bgColor: string
  txtColor: string
  height: 'big' | 'small'
  unitType: 'won' | 'percent'
}

const getHeight = (value: 'big' | 'small') => {
  if (value === 'big') {
    return 'h-[50px]'
  } else {
    return 'h-[15px]'
  }
}

const HorizontalGarphBar = (props: Props) => {
  // console.log(props.length)
  return (
    <div className="flex items-center gap-2">
      <div className="text-xs w-[24px]">{props.title}</div>
      <div
        className={`${props.bgColor} ${getHeight(props.height)} rounded-md`}
        style={{ width: props.length }}
      ></div>
      <div
        className={`${props.txtColor} text-[10px] leading-5 font-scDreamLight`}
      >
        {props.unitType === 'won'
          ? `${props.amount.toLocaleString()} 원`
          : props.unitType === 'percent'
          ? `${props.amount}%`
          : props.amount}
      </div>
    </div>
  )
}

export default HorizontalGarphBar
