import { faQuestion } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const MissionEmptyAlert = () => {
    return(
        <div className='w-full h-[300px] flex flex-col items-center justify-center text-primary gap-5'>
            <FontAwesomeIcon icon={faQuestion} size="xl"/>
            참여한 미션이 없습니다.
        </div>
    )
}

export default MissionEmptyAlert