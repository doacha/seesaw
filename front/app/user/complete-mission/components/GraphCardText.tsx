interface Props {
  textBefore: string
  amount: number
  textAfter: string
  comment: string
}

const GraphCardText = (props: Props) => {
  return (
    <div className="flex flex-col">
      <div className="flex text-xl font-scDreamExBold">
        {props.textBefore}
        <div className="text-secondary">{props.amount.toLocaleString()}</div>
        {props.textAfter}
      </div>
      <div className="text-sm text-outline">{props.comment}</div>
    </div>
  )
}

export default GraphCardText
