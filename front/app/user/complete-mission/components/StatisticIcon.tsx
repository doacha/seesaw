import {
  faMoneyBill1,
  faMoneyBills,
  faCrown,
  faSackDollar,
  faFire,
  faLock,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
  color: string
  icon: string
}

const StatisticIcon = (props: Props) => {
  return (
    <div
      className={`flex w-12 h-12 rounded-full ${props.color} items-center justify-center`}
    >
      {props.icon === 'faMoneyBills' ? (
        <FontAwesomeIcon icon={faMoneyBills} size="xl" color="white" />
      ) : props.icon === 'faMoneyBill1' ? (
        <FontAwesomeIcon icon={faMoneyBill1} size="xl" color="white" />
      ) : props.icon === 'faCrown' ? (
        <FontAwesomeIcon icon={faCrown} size="xl" color="white" />
      ) : props.icon === 'faSackDollar' ? (
        <FontAwesomeIcon icon={faSackDollar} size="xl" color="white" />
      ) : props.icon === 'faFire' ? (
        <FontAwesomeIcon icon={faFire} size="xl" color="white" />
      ) : props.icon === 'faLock' ? (
        <FontAwesomeIcon icon={faLock} size="xl" color="white" />
      ) : null}
    </div>
  )
}

export default StatisticIcon
