import type { MissionCreate } from '@/app/types'
import { faCircle, faCircleDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const SelectSavingInput = ({
  state,
  setState,
}: {
  state: MissionCreate
  setState: React.Dispatch<React.SetStateAction<MissionCreate>>
}) => {
  const handleClick = (select: boolean) => {
    setState({ ...state, memberMissionIsSaving: select })
  }
  return (
    <div>
      <div className="font-scDreamExBold mb-5">
        적금 미션으로 설정하시겠어요?
      </div>
      <div className="flex gap-2">
        <div className="" onClick={() => handleClick(true)}>
          <span className="text-sm mr-2">네</span>
          {state.memberMissionIsSaving && (
            <FontAwesomeIcon icon={faCircleDot} className="text-primary" />
          )}
          {!state.memberMissionIsSaving && (
            <FontAwesomeIcon icon={faCircle} className="text-primary" />
          )}
        </div>
        <div className="" onClick={() => handleClick(false)}>
          <span className="text-sm mr-2">아니오</span>
          {!state.memberMissionIsSaving && (
            <FontAwesomeIcon icon={faCircleDot} className="text-primary" />
          )}
          {state.memberMissionIsSaving && (
            <FontAwesomeIcon icon={faCircle} className="text-primary" />
          )}
        </div>
      </div>
    </div>
  )
}

export default SelectSavingInput
