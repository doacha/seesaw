import { missionPeriodArray } from '@/app/lib/constants'
import ToggleCapsule from '@/app/components/ToggleCapsule'
const PeriodInput = ({
  name,
  value,
  onChange,
}: {
  name: string
  value?: string
  onChange: any
}) => {
  return (
    <div>
      {' '}
      <div className="font-scDreamExBold mb-5">미션 빈도를 설정해주세요.</div>
      <div className="carousel">
        {missionPeriodArray.map((element, idx) => (
          <ToggleCapsule
            className="carousel-item"
            bgColor="background-fill"
            textColor="black"
            value={idx}
          >
            {element}
          </ToggleCapsule>
        ))}
      </div>
    </div>
  )
}

export default PeriodInput
