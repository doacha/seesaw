interface Props {
  title: string
  length: string
  amount: number
  bgColor: string
  txtColor: string
}

const HorizontalGarphBar = (props: Props) => {
  console.log(props.length)
  return (
    <div className="flex items-center gap-2">
      <div className="text-xs">{props.title}</div>
      <div
        className={`${props.bgColor} h-[50px] rounded-md`}
        style={{ width: props.length }}
      ></div>
      <div className={`${props.txtColor} text-[10px]`}>
        {props.amount.toLocaleString()}
      </div>
    </div>
  )
}

export default HorizontalGarphBar
