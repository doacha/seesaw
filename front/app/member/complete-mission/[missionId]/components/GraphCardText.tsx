interface Props {
  textBefore: string
  amount?: number
  textAfter: string
  comment: string
  txtColor: string
}

const GraphCardText = (props: Props) => {
  return (
    <div className="flex flex-col">
      <div className="flex text-lg font-scDreamMedium">
        {props.textBefore}
        <div className={props.txtColor}>{props.amount?.toLocaleString()}</div>
        {props.textAfter}
      </div>
      <div className="text-sm text-outline font-scDreamLight">
        {props.comment}
      </div>
    </div>
  )
}

export default GraphCardText
