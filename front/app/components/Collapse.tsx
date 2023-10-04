import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

interface Props {
  title: React.ReactNode
  content: React.ReactNode
  bgColor: string
}

const Collapse = (props: Props) => {
  const [isOpened, setIsOpened] = useState<Boolean>(false)

  return (
    <div className={`collapse ${props.bgColor} rounded-lg`}>
      <input type="checkbox" onClick={() => setIsOpened(!isOpened)} />
      <div className="collapse-title text-xl font-medium p-5 pb-3 flex flex-col gap-2">
        {props.title}
        <div className="w-full h-[1px] bg-outline-container" />
        <FontAwesomeIcon
          icon={faChevronDown}
          className={
            isOpened
              ? `text-outline-container justify-self-center rotate-180 transition-all`
              : `text-outline-container justify-self-center transition-all`
          }
        />
      </div>
      <div className="collapse-content p-x5"></div>
    </div>
  )
}

export default Collapse
