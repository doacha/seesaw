import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
  onClickEvent: () => void
}

const OpenModalButton = (props: Props) => {
  return (
    <div
      className="bg-outline-container rounded-lg flex justify-center items-center h-28"
      onClick={props.onClickEvent}
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="flex text-background">내 계좌 등록</div>
        <div className="rounded-full w-[50px] h-[50px] flex items-center justify-center bg-white">
          <FontAwesomeIcon
            icon={faPlus}
            className="text-outline-container"
            size="2xl"
          />
        </div>
      </div>
    </div>
  )
}

export default OpenModalButton
