import { faMoneyBill1 } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ReactNode } from 'react'

type Props = {
  title?: String
  content: React.ReactNode
  bgColor?: 'bg-background-fill'
}
const Card = (props: Props) => {
  return (
    <div
      className={
        props.bgColor
          ? `card w-full h-fit ${props.bgColor}`
          : 'card w-full h-fit bg-background'
      }
    >
      <div className="card-body p-5">
        {props.title ? (
          <>
            <div className="card-title font-scDreamRegular">{props.title}</div>
            <div className="h-[1px] bg-outline rounded-full"></div>
          </>
        ) : null}
        <div className="flex flex-col gap-5">{props.content}</div>
      </div>
    </div>
  )
}

export default Card
