import { faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
  color: string
  icon: string
}

const StatisticIcon = (props: Props) => {
  return (
    <div
      className={`flex w-14 h-14 rounded-full ${props.color} items-center justify-center`}
    >
      {props.icon === 'faMoneyBill' ? (
        <FontAwesomeIcon icon={faMoneyBill} size="xl" color="white" />
      ) : null}
    </div>
  )
}

export default StatisticIcon
