import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const FaskMakeButton = ({ onClick }: { onClick: any }) => {
  // fast 버튼은 가계부에만 넣는건가?
  return (
    <div
      className="z-50 flex justify-center items-center rounded-full bg-primary-container w-[70px] h-[70px] m-0 drop-shadow-md"
      onClick={onClick}
    >
      <FontAwesomeIcon
        icon={faPlus}
        size="2xl"
        className=" text-white absolute m-auto"
      />
    </div>
  )
}

export default FaskMakeButton
