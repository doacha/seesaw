import type { MissionCreate } from '@/app/types'
import { faCircle, faCircleDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const SelectPublicInput = ({
  state,
  setState,
}: {
  state: MissionCreate
  setState: React.Dispatch<React.SetStateAction<MissionCreate>>
}) => {
  const handleClickPublic = () => {
    setState({ ...state, missionIsPublic: true })
  }
  const handleClickPrivate = () => {
    setState({ ...state, missionIsPublic: false })
  }
  return (
    <div>
      <div className="font-scDreamExBold mb-5">그룹 공개 설정을 해주세요.</div>
      <div className="flex gap-2">
        <div className="" onClick={handleClickPublic}>
          <span className="text-sm mr-2">공개</span>
          {state.missionIsPublic && (
            <FontAwesomeIcon icon={faCircleDot} className="text-primary" />
          )}
          {!state.missionIsPublic && (
            <FontAwesomeIcon icon={faCircle} className="text-primary" />
          )}
        </div>
        <div className="" onClick={handleClickPrivate}>
          <span className="text-sm mr-2">비공개</span>
          {!state.missionIsPublic && (
            <FontAwesomeIcon icon={faCircleDot} className="text-primary" />
          )}
          {state.missionIsPublic && (
            <FontAwesomeIcon icon={faCircle} className="text-primary" />
          )}
        </div>
      </div>
    </div>
  )
}

export default SelectPublicInput
