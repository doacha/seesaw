import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SearchBar = () => {
  return (
    <div className="flex items-center gap-2.5">
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <div className="border-b-[1px] w-full border-black">
        <input
          className="input input-ghost focus:outline-none w-full placeholder:font-scDreamLight p-0 m-0 h-[26px]"
          placeholder=" 미션 이름을 검색해주세요."
        />
      </div>
    </div>
  )
}

export default SearchBar
