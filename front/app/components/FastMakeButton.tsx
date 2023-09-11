import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const FaskMakeButton = ({ onClick }: { onClick: any }) => {
  return (
    <div className="fixed left-[295px] z-1 top-[450px] rounded-full bg-background-fill w-[60px] h-[60px] m-0 relative flex justify-center items-center drop-shadow-md">
      <FontAwesomeIcon
        icon={faPlus}
        size="2xl"
        className="text-black absolute m-auto"
      />
    </div>
  )
}

export default FaskMakeButton
