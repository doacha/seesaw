'use client'
import Capsule from '@/app/components/Capsule'
import SearchBarSimple from './SearchBarSimple'
import DropdownCapsule from './DropdownCapsule'
import ToggleCapsule from '@/app/components/ToggleCapsule'
import {
  categoryList,
  missionCycleArray,
  missionPeriodArray,
} from '@/app/lib/constants'
import type { SearchState } from '@/app/types'
const SearchContainerSimple = ({
  state,
  onClick,
}: {
  state: SearchState
  onClick: any
}) => {
  return (
    <div
      className="rounded-lg bg-background px-5 py-2.5 w-full"
      onClick={onClick}
    >
      <SearchBarSimple state={state} />
      <div className="mt-2.5 flex flex-wrap gap-y-2.5">
        <DropdownCapsule
          className="mr-2.5"
          state={state.category}
          title="카테고리"
          type={0}
        />
        <DropdownCapsule
          className="mr-2.5"
          state={state.period}
          title="인증 주기"
          type={1}
        />
        <DropdownCapsule state={state.cycle} title="미션 기간" type={2} />
      </div>
    </div>
  )
}
enum SearchType {
  Category,
  Period,
  Cycle,
}
const getDropdownTitle = (
  state: Array<number>,
  title: string,
  type: number,
) => {
  if (state.length === 0) {
    return title
  } else if (state.length === 1) {
    switch (type) {
      case SearchType.Category:
        return categoryList[state[0]]
      case SearchType.Period:
        return missionPeriodArray[state[0]]
      default:
        return missionCycleArray[state[0]]
    }
  } else {
    return `${title} ${state.length}개`
  }
}
export default SearchContainerSimple
