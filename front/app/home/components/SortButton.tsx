interface SortButtonsProps {
  sort: string
  //   마우스 이벤트는 반드시 React.MouseEvent를 사용해야 한다.
  clickText: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const SortButtons = ({ sort, clickText }: SortButtonsProps) => {
  return (
    <div className="flex h-12 border-t-2 border-outline-container bg-background">
      {/* 메모있음을.. 버려.. */}
      {/* <div className="mx-2 my-auto">
        <label className="label cursor-pointer">
          <input
            type="checkbox"
            className="w-6 h-6 border-2-outline rounded focus:ring-3 focus:ring-sky-500"
            // checked
          />
          <span className="pl-1 label-text text-lg text-zinc-700">
            메모 있음
          </span>
        </label>
      </div> */}
      <div className="flex w-full justify-end gap-1 mx-2">
        <button
          className={
            sort === '최신순'
              ? 'font-scDreamMedium text-primary'
              : 'font-scDreamRegular text-outline-container'
          }
          onClick={clickText}
        >
          최신순
        </button>
        <p className=" text-gray-200 my-auto"> | </p>
        <button
          className={
            sort === '고액순'
              ? 'font-scDreamMedium text-primary'
              : 'font-scDreamRegular text-outline-container'
          }
          onClick={clickText}
        >
          고액순
        </button>
      </div>
    </div>
  )
}

export default SortButtons
