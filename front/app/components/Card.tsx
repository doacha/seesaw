import { faMoneyBill1 } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ReactNode } from 'react'

type Props = {
  title?: String
  content: React.ReactNode
}
const Card = (props: Props) => {
  return (
<<<<<<< HEAD
    <div className="card w-full h-fit bg-white">
=======
    <div className="card w-full h-fit bg-background">
>>>>>>> 76a4c7b91d12b32411a332c1f0f8d2aa67bcfd94
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
