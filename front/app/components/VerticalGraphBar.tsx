interface Props {
  round?: number
  length: string
  amount: number
  bgColor: string
  txtColor: string
  type : '회차' | '월' | '현재'
}

const VerticalGraphBar = (props: Props) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`${props.txtColor} text-[10px]`}>
        {props.amount.toLocaleString()}
      </div>
      <div
        className={`${props.bgColor} w-[30px] rounded-md`}
        style={{ height: props.length }}
      ></div>
      <div className="text-xs w-fit whitespace-nowrap">{props.round}{props.type}</div>
    </div>
  )
}

export default VerticalGraphBar
