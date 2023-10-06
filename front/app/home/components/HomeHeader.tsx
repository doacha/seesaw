import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons'
import Button from '@/app/components/Button'
import { Spending } from '@/app/types'

interface HomeHeaderProps {
  spend: Spending
  spendSum: number
  clickArrowLeft: () => void
  clickArrowRight: () => void
  clickReport: () => void
  isEmpty: boolean
}

const HomeHeader = ({
  spend,
  spendSum,
  clickArrowLeft,
  clickArrowRight,
  clickReport,
  isEmpty,
}: HomeHeaderProps) => {
  return (
    <div className="flex justify-between mx-5 mt-4">
      <div className="my-auto">
        <div className="flex flex-row gap-3 mb-1">
          <button
            className="my-auto w-6 h-6"
            onClick={clickArrowLeft}
            type="button"
            name="left-arrow"
          >
            <FontAwesomeIcon
              icon={faChevronLeft}
              style={{ color: '#001b2a' }}
            />
          </button>
          <p className="text-xl font-envR">
            {spend.spendingYear}년 {spend.spendingMonth}월
          </p>
          <button
            className="my-auto w-6 h-6"
            onClick={clickArrowRight}
            type="button"
            name="right-arrow"
          >
            <FontAwesomeIcon
              icon={faChevronRight}
              style={{ color: '#001b2a' }}
            />
          </button>
        </div>
        <div className="flex">
          <p className="text-3xl mx-auto font-envR">
            {isEmpty ? '0원' : spendSum.toLocaleString('ko-KR') + '원'}
          </p>
        </div>
      </div>
      <div className="flex mx-2 mt-2 mb-2 my-auto flex-col">
        <div className="mb-3 flex flex-row mx-auto items-end">
          <p
            className="tracking-wide font-envR text-base animate-bounceInfinite "
            style={{
              animationDelay: '0.1s',
              animationIterationCount: 'infinite',
              color: '#6161AF',
            }}
          >
            시
          </p>
          <p
            className="tracking-wide font-envR text-sm animate-bounceInfinite "
            style={{
              animationDelay: '0.2s',
              animationIterationCount: 'infinite',
              color: '#B7B2FF',
            }}
          >
            작
          </p>
          <p
            className="tracking-wide font-envR text-sm animate-bounceInfinite "
            style={{
              animationDelay: '0.3s',
              animationIterationCount: 'infinite',
              color: '#B7B2FF',
            }}
          >
            하
          </p>
          <p
            className="tracking-wide font-envR text-sm animate-bounceInfinite "
            style={{
              animationDelay: '0.4s',
              animationIterationCount: 'infinite',
              color: '#B7B2FF',
            }}
          >
            자&nbsp;
          </p>

          <p
            className="tracking-wide font-envR text-base animate-bounceInfinite "
            style={{
              animationDelay: '0.6s',
              animationIterationCount: 'infinite',
              color: '#539CE5',
            }}
          >
            소
          </p>
          <p
            className="tracking-wide font-envR text-sm animate-bounceInfinite "
            style={{
              animationDelay: '0.7s',
              animationIterationCount: 'infinite',
              color: '#AFC3FF',
            }}
          >
            비
          </p>
          <p
            className="tracking-wide font-envR text-sm animate-bounceInfinite "
            style={{
              animationDelay: '0.8s',
              animationIterationCount: 'infinite',
              color: '#AFC3FF',
            }}
          >
            절
          </p>
          <p
            className="tracking-wide font-envR text-sm animate-bounceInfinite "
            style={{
              animationDelay: '0.9s',
              animationIterationCount: 'infinite',
              color: '#AFC3FF',
            }}
          >
            약
          </p>
        </div>
        <Button
          color="primary"
          label="소비리포트"
          onClick={clickReport}
          size="xl"
        />
      </div>
    </div>
  )
}

export default HomeHeader
