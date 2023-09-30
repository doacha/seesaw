import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons'
import Button from '@/app/components/Button'
import { Spending } from '@/app/types'

interface HomeHeaderProps {
  spend: Spending[]
  clickArrow: () => void
  clickReport: () => void
}

const HomeHeader = ({ spend, clickArrow, clickReport }: HomeHeaderProps) => {
  return (
    <div className="flex justify-between mx-5 mt-4">
      {spend.map((spending, idx) => (
        <div className="my-auto" key={idx}>
          <div className="flex flex-row gap-3 mb-1">
            <button
              className="my-auto w-6 h-6"
              onClick={clickArrow}
              type="button"
              name="left-arrow"
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
                style={{ color: '#001b2a' }}
              />
            </button>
            <p className="text-2xl font-envR">{spending.spendingMonth}월</p>
            <button
              className="my-auto w-6 h-6"
              onClick={clickArrow}
              type="button"
              name="right-arrow"
            >
              <FontAwesomeIcon
                icon={faChevronRight}
                style={{ color: '#001b2a' }}
              />
            </button>
          </div>
          <p className="text-3xl font-envR">
            {spending.spendingCostSum &&
              spending.spendingCostSum.toLocaleString('ko-KR')}
            원
          </p>
        </div>
      ))}
      <div className="mx-2 my-auto flex-col">
        <div className="mb-3">
          <Button
            color="primary"
            label="소비 예측"
            onClick={clickReport}
            size="xl"
          />
        </div>
        <Button
          color="secondary"
          label="소비리포트"
          onClick={clickReport}
          size="xl"
        />
      </div>
    </div>
  )
}

export default HomeHeader
