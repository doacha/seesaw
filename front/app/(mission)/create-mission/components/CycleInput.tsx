import ToggleCapsule from '@/app/components/ToggleCapsule'
import { missionCycleArray } from '@/app/lib/constants'

const CycleInput = ({
  name,
  value,
  onChange,
  period,
  state,
}: {
  name: string
  value?: string
  onChange: any
  period?: number
  state: number
}) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <span className="font-scDreamExBold">미션 기간을 설정해주세요.</span>
        {period && (
          <span className="text-outline font-scDreamRegular text-xs">
            총 {(state * 7) / period}회입니다.
          </span>
        )}
      </div>
      <div className="carousel">
        {missionCycleArray.map(
          (element, idx) =>
            element && (
              <ToggleCapsule
                className="carousel-item"
                bgColor="background-fill"
                textColor="black"
                value={idx}
                key={idx}
              >
                {element ?? ''}
              </ToggleCapsule>
            ),
        )}
      </div>
    </div>
  )
}

export default CycleInput
