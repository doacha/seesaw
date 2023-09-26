'use client'

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { MissionList, SearchState } from '@/app/types'
import { useQuery } from '@tanstack/react-query'
import { missionListStore } from '@/stores/missionList'
const getSearchList = async (input: SearchState) => {
  console.log('input', input)
  console.log('asdf', convertStateToRequest(input))
  return (await fetch(
    `${
      process.env.NEXT_PUBLIC_SEESAW_API_URL
    }/mission/search?${new URLSearchParams(
      convertStateToRequest(input),
    ).toString()}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  ).then((res) => {
    console.log(res.json())
    return res
  })) as MissionList[]
}

const SearchBar = ({
  state,
  onChange,
}: {
  state: SearchState
  onChange: any
}) => {
  const { currentMissionList, setCurrentMissionList } = missionListStore()
  const { data, refetch } = useQuery<MissionList[]>({
    queryKey: ['mission-card', state],
    queryFn: () => getSearchList(state),
    suspense: true,
    staleTime: 5 * 1000,
    enabled: false,
  })

  const handleSubmit = () => {
    refetch()
    console.log('isOK?')
    if (data) {
      setCurrentMissionList(data)
      console.log('isOK')
    }
  }

  return (
    <div className="flex items-center gap-2.5">
      <FontAwesomeIcon icon={faMagnifyingGlass} onClick={handleSubmit} />
      <div className="border-b-[1px] w-full border-black">
        <input
          className="input input-ghost focus:outline-none w-full placeholder:font-scDreamLight p-0 m-0 h-[26px]"
          placeholder=" 미션 이름을 검색해주세요."
          value={state.inputText}
          onChange={onChange}
        />
      </div>
    </div>
  )
}

const convertStateToRequest = (input: SearchState) => {
  const request: { [key: string]: any } = {}
  if (input.inputText.length > 0) {
    request.keyword = input.inputText
  }
  if (input.category > 0) {
    request.missionCategoryId = input.category
  }
  if (input.period > 0 && input.cycle > 0) {
    request.missionPeriod = input.period
    request.missionCycle = (input.cycle * 7) / input.period
  }
  return request
}
export default SearchBar
