import { missionCycleArray } from '@/app/lib/constants'
import ToggleCapsule from '@/app/components/ToggleCapsule'
import { MissionCreate } from '@/app/types'
import styles from '@/app/(mission)/mission/components/SearchContainer.module.css'
const CycleInput = ({
  state,
  handleClick,
}: {
  state: MissionCreate
  handleClick: any
}) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <span className="font-scDreamExBold mb-5">
          미션 기간을 설정해주세요.
        </span>
        {state.missionPeriod > 0 && state.missionTotalCycle > 0 && (
          <span className="text-outline font-scDreamRegular text-xs">
            총 {Math.trunc((state.missionTotalCycle * 7) / state.missionPeriod)}
            회
          </span>
        )}
      </div>
      <div className={`overflow-auto ${styles.delScroll}`}>
        <div className="carousel">
          {missionCycleArray.map(
            (element, idx) =>
              element && (
                <ToggleCapsule
                  className="carousel-item mr-[15px]"
                  bgColor="background-fill"
                  textColor="black"
                  key={idx}
                  isSelected={idx === state.missionTotalCycle}
                  onClick={() =>
                    handleClick(
                      idx,
                      idx === state.missionTotalCycle,
                      'missionTotalCycle',
                    )
                  }
                >
                  {element}
                </ToggleCapsule>
              ),
          )}
        </div>
      </div>
    </div>
  )
}

export default CycleInput
