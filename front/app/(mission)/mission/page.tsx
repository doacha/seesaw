'use client'
import SearchContainerSimple from '../components/SearchContainerSimple'
import SearchContainer from './components/SearchContainer'
import Header from '@/app/components/Header'
import type { SearchState, MissionList } from '@/app/types'
import MissionCard from '../components/MissionCard'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

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
    console.log('환료')
    return res.json()
  })) as MissionList[]
}

const MissionPage = () => {
  const [isActiveSearch, setIsActiveSearch] = useState(true)
  const [searchState, setSearchState] = useState<SearchState>({
    inputText: '',
    category: 0,
    cycle: -1,
    period: -1,
    isEnabled: true,
  })
  const { data, refetch, isSuccess } = useQuery<MissionList[]>({
    queryKey: ['mission-card', searchState],
    queryFn: () => getSearchList(searchState),
    staleTime: 50000,
    cacheTime: 50000,
    // enabled: searchState.isEnabled,
  })

  // if (isSuccess && searchState.isEnabled) {
  //   setSearchState({ ...searchState, isEnabled: false })
  // }

  const handleActiveSearch = () => {
    setIsActiveSearch(true)
  }

  const handleDeactiveSearch = () => {
    setIsActiveSearch(false)
  }

  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchState({ ...searchState, inputText: e.target.value })
  }
  const handleCapsuleClick = (
    idx: number,
    isSelected: boolean,
    type: string,
  ) => {
    if (isSelected) {
      setSearchState({ ...searchState, [type]: -1, isEnabled: true })
      return
    }
    setSearchState({ ...searchState, [type]: idx, isEnaled: true })
  }

  return (
    <div className="bg-background-fill h-full">
      <Header title="미션 목록" plusButton backButton />
      <div className="py-16 pt-[74px] overflow-scroll flex flex-col gap-5 px-5">
        {isActiveSearch && (
          <SearchContainer
            onClick={handleDeactiveSearch}
            handleCapsule={handleCapsuleClick}
            state={searchState}
            setState={setSearchState}
          />
        )}
        {!isActiveSearch && (
          <SearchContainerSimple
            onClick={handleActiveSearch}
            state={searchState}
          />
        )}
        {isSuccess && (
          <div className="flex flex-wrap gap-5">
            {data?.map((element, idx) => (
              <MissionCard data={element} key={idx} />
            ))}
          </div>
        )}
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

export default MissionPage
