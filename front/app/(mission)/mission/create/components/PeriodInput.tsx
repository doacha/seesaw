import { missionPeriodArray } from '@/app/lib/constants'
import ToggleCapsule from '@/app/components/ToggleCapsule'
import { MissionCreate } from '@/app/types'
import styles from '@/app/(mission)/mission/components/SearchContainer.module.css'
const PeriodInput = ({
  state,
  handleClick,
  calculateSavingMoney,
}: {
  state: MissionCreate
  handleClick: any
  calculateSavingMoney: any
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
                isSelected={idx === state.missionPeriod}
                onClick={() => {
                  handleClick(idx, idx === state.missionPeriod, 'missionPeriod')
                  calculateSavingMoney(idx)
                }}
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
