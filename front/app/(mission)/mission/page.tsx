'use client'
import SearchContainerSimple from '../components/SearchContainerSimple'
import SearchContainer from './components/SearchContainer'
import Header from '@/app/components/Header'
import type { SearchState, MissionList, Mission } from '@/app/types'
import MissionCard from '../components/MissionCard'
import { useEffect, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { categoryList } from '@/app/lib/constants'
import { isStarted } from '../util'
import useIntersect from '../useIntersect'

const getSearchList = async (input: { [key: string]: any }, page: number) => {
  return (await fetch(
    `${
      process.env.NEXT_PUBLIC_SEESAW_API_URL
    }/mission/search?${new URLSearchParams(
      convertStateToRequest(input, page),
    ).toString()}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  ).then((res) => {
    return res.json()
  })) as MissionList[]
}
const MissionPage = () => {
  const [isActiveSearch, setIsActiveSearch] = useState(true)
  const [hasNext, setHasNext] = useState(true)
  const [searchState, setSearchState] = useState<SearchState>({
    inputText: '',
    category: 0,
    cycle: -1,
    period: -1,
    // isEnabled: true,
  })
  const [page, setPage] = useState(0)
  const [missionList, setMissionList] = useState<MissionList[]>([])
  // const { data, refetch, isSuccess, isLoading } = useQuery<MissionList[]>({
  //   queryKey: ['mission-card', searchState],
  //   queryFn: () => getSearchList(searchState),
  //   staleTime: 50000,
  //   cacheTime: 50000,
  //   // enabled: searchState.isEnabled,
  // })

  useEffect(() => {
    const getInitData = async (state: SearchState, page: number) => {
      let data = await getSearchList(searchState, page)
      setMissionList(data)
      setPage(1)
      setHasNext(true)
    }
    getInitData(searchState, 0)
  }, [searchState])

  const handleActiveSearch = () => {
    setIsActiveSearch(true)
  }

  const handleDeactiveSearch = () => {
    setIsActiveSearch(false)
  }

  const handleListEmpty = () => {
    setMissionList([])
  }

  const handleCapsuleClick = (
    idx: number,
    isSelected: boolean,
    type: string,
  ) => {
    if (isSelected) {
      setSearchState({ ...searchState, [type]: -1, isEnabled: true, page: 0 })
      return
    }
    setSearchState({ ...searchState, [type]: idx, isEnaled: true, page: 0 })
  }

  // 무한스크롤용 로직
  const [_, setRef] = useIntersect(async (entry, observer) => {
    // 불러올게없을때
    if (!hasNext) return

    let temp = await getSearchList(searchState, page)
    if (temp.length < 6) {
      setHasNext(false)
    }

    setMissionList((prev) => prev.concat(temp))
    setPage(page + 1)

    observer.unobserve(entry.target)
  }, {})

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
            setListEmpty={handleListEmpty}
          />
        )}
        {!isActiveSearch && (
          <SearchContainerSimple
            onClick={handleActiveSearch}
            state={searchState}
          />
        )}
        {
          <div className="flex flex-wrap gap-5 h-[620px] overflow-scroll">
            {missionList?.map((element, idx) => (
              <MissionCard
                data={element}
                key={idx}
                category={categoryList[element.missionCategoryId]}
                isStarted={isStarted(element.missionStartDate)}
              />
            ))}
          </div>
        }
        {missionList.length > 0 && (
          <div ref={setRef} className="opacity-0">
            now loading
          </div>
        )}
      </div>
    </div>
  )
}

const convertStateToRequest = (input: { [key: string]: any }, page: number) => {
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
  request.page = page
  return request
}

export default MissionPage
