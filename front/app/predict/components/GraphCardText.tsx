interface Props {
  amount?: number
  comment: string
  txtColor: string
}

const GraphCardText = (props: Props) => {
  return (
    <div className="flex flex-col">
      <div className="flex text-lg font-scDreamMedium">
        이번 달 예상 지출은
        <div className={props.txtColor}>{props.amount?.toLocaleString()}</div>
        만원 입니다.
      </div>
      <div className="text-sm text-outline font-scDreamLight">
        {props.comment}
      </div>
    </div>
  )
}

export default GraphCardText
