import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const FaskMakeButton = ({
  onClick,
  customCSS,
}: {
  onClick: any
  customCSS?: string
}) => {
  // fast 버튼은 가계부에만 넣는건가?
  return (
    <div className="fixed right-[5vw] z-30 bottom-[80px] rounded-full bg-primary-container w-[60px] h-[60px] m-0 flex justify-center items-center drop-shadow-md">
      <FontAwesomeIcon
        icon={faPlus}
        size="2xl"
        className={`text-background absolute m-auto ${customCSS ?? ''}`}
        onClick={onClick}
      />
    </div>
  )
}

export default FaskMakeButton
