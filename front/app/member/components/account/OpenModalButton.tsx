import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
  onClickEvent: () => void
}

const OpenModalButton = (props: Props) => {
  return (
    <div
      className="bg-outline-container rounded-lg flex justify-center items-center h-20"
      onClick={props.onClickEvent}
    >
      <div className="rounded-full w-[50px] h-[50px] flex items-center justify-center bg-white">
        <FontAwesomeIcon
          icon={faPlus}
          className="text-outline-container"
          size="2xl"
        />
      </div>
    </div>
  )
}

export default OpenModalButton
