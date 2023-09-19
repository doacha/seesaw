interface Props {
  round: number
  length: string
  amount?: number
  bgColor: string
  txtColor: string
}
const ReportVerticalGraphBar = (props: Props) => {
  return (
    <div className="flex flex-col items-center">
      {/* <div className={`${props.txtColor} text-xs`}>
        {props.amount.toLocaleString()}
      </div> */}
      {/* 월이면 w-10px, 일이면 5px, 주면 w-15 */}
      <div
        className={`${props.bgColor} w-[20px] rounded-md mx-2`}
        style={{ height: props.length }}
      ></div>
      {/* <div className="text-xs">{props.round + 1}일</div> */}
    </div>
  )
}

export default ReportVerticalGraphBar
