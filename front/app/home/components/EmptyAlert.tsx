import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const EmptyAlert = () => {
  return (
    <div className="w-full flex rounded-lg h-[520px] items-center justify-center ">
      <div className="text-primary flex flex-col pb-8 gap-5">
        <FontAwesomeIcon icon={faQuestion} size="xl" />
        저장된 데이터가 없습니다!
      </div>
    </div>
  )
}

export default EmptyAlert
