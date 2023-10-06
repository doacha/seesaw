'use client'

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { SearchState } from '@/app/types'
import { missionListStore } from '@/stores/missionList'
import { KeyboardEventHandler, useRef } from 'react'

const SearchBar = ({
  state,
  setState,
  setListEmpty,
}: {
  state: SearchState
  setState: React.Dispatch<React.SetStateAction<SearchState>>
  setListEmpty: () => void
}) => {
  const handleSubmit = () => {
    setState({
      ...state,
      inputText: inputRef.current?.value ?? '',
      isEnabled: true,
    })
    // setListEmpty()
  }

  const handleEnter = (event: any) => {
    if (event.key === 'Enter') {
      handleSubmit()
    }
  }
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="flex items-center gap-2.5">
      <FontAwesomeIcon icon={faMagnifyingGlass} onClick={handleSubmit} />
      <div className="border-b-[1px] w-full border-black">
        <input
          className="input input-ghost focus:outline-none w-full placeholder:font-scDreamLight p-0 m-0 h-[26px]"
          placeholder=" 미션 이름을 검색해주세요."
          defaultValue={state.inputText}
          ref={inputRef}
          onChange={() => {}}
          onKeyDown={handleEnter}
        />
      </div>
    </div>
  )
}

export default SearchBar
