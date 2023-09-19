interface Props {
  round: number
  length: string
  amount: number
  bgColor: string
  txtColor: string
}

const VerticalGraphBar = (props: Props) => {
  console.log(props.length)
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`${props.txtColor} text-[10px]`}>
        {props.amount.toLocaleString()}
      </div>
      <div
        className={`${props.bgColor} w-[30px] rounded-md`}
        style={{ height: props.length }}
      ></div>
      <div className="text-xs">{props.round}회차</div>
    </div>
  )
}

export default VerticalGraphBar
