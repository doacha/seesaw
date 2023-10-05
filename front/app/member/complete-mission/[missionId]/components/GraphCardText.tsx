interface Props {
  textBefore: string
  amount?: number
  textAfter: string
  comment: string
  txtColor: string
}

const GraphCardText = (props: Props) => {
  console.log('amount값', props.amount)
  return (
    <div className="flex flex-col">
      <div className="flex text-lg font-scDreamMedium flex-wrap">
        <div className="inline-block whitespace-nowrap">{props.textBefore}</div>
        {props.amount ? (
          <div className={`inline-block whitespace-nowrap ${props.txtColor}`}>
            {props.amount.toLocaleString()}원
          </div>
        ) : props.amount === 0 ? (
          <div className={`inline-block whitespace-nowrap ${props.txtColor}`}>
            0원
          </div>
        ) : null}
        <div className="inline-block whitespace-nowrap">{props.textAfter}</div>
      </div>
      <div className="text-sm text-outline font-scDreamLight">
        {props.comment}
      </div>
    </div>
  )
}

export default GraphCardText
