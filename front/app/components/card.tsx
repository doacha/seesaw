import { faMoneyBill1 } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ReactNode } from 'react'

type Props = {
  title: String
  content: ReactNode
}
const Card = (props: Props) => {
  return (
    <div className="card w-full h-fit bg-base-100 shadow-xl">
      <div className="card-body p-5">
        <div className="card-title font-scDreamRegular">{props.title}</div>
        <div className="h-[1px] bg-outline rounded-full"></div>
        <div>
          <FontAwesomeIcon icon={faMoneyBill1} />
        </div>
      </div>
    </div>
  )
}

export default Card
