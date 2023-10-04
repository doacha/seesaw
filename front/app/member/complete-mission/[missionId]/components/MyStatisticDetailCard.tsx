import StatisticIcon from './StatisticIcon'

interface Props {
  title: string
  content: string
  amount: number
  icon: string
  iconColor: string
  round?: number
}

const MyStatisticDetailCard = (props: Props) => {
  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <StatisticIcon icon={props.icon} color={props.iconColor} />
        <div className="flex flex-col">
          <div>{props.title}</div>
          <div className="flex text-outline text-sm">
            {props.round ? <div>{props.round}회차 &nbsp;</div> : null}
            {props.content}
          </div>
        </div>
      </div>
      <div className="text-xl font-scDreamMedium">
        {props.amount ? props.amount.toLocaleString() : 0}원
      </div>
    </div>
  )
}

export default MyStatisticDetailCard
