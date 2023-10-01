import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

  
  const EndAlert = () => {
    return (
      <div className="w-full h-20 flex flex-col items-center justify-center border-outline-container">
        <FontAwesomeIcon icon={faCheck} size="xl" className="text-primary"/>
        <div className="text-lg font-scDreamMedium">내역을 모두 불러왔습니다.</div>
      </div>
    )
  }
  
  export default EndAlert
  