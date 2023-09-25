import { missionPeriodArray } from '@/app/lib/constants'
import ToggleCapsule from './ToggleCapsule'
import { MissionCreate } from '@/app/types'
import styles from '@/app/(mission)/mission/components/SearchContainer.module.css'
const PeriodInput = ({
  state,
  setState,
}: {
  state: MissionCreate
  setState: React.Dispatch<React.SetStateAction<MissionCreate>>
}) => {
  return (
    <div className={`overflow-auto ${styles.delScroll}`}>
      <div className="font-scDreamExBold mb-5">미션 빈도를 설정해주세요.</div>
      <div className="carousel">
        {missionPeriodArray.map(
          (element, idx) =>
            element && (
              <ToggleCapsule
                className="carousel-item mr-[15px]"
                bgColor="background-fill"
                textColor="black"
                key={idx}
                value={idx}
                state={state}
                setState={setState}
                isSelected={idx === state.missionPeriod}
                type="missionPeriod"
              >
                {element}
              </ToggleCapsule>
            ),
        )}
      </div>
    </div>
  )
}

export default PeriodInput
