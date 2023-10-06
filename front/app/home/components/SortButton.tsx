interface SortButtonsProps {
  sort: string
  //   마우스 이벤트는 반드시 React.MouseEvent를 사용해야 한다.
  clickText: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const SortButtons = ({ sort, clickText }: SortButtonsProps) => {
  return (
    <div className="h-[48px] border-t-2 border-outline-container bg-background">
      <div className="flex h-full my-auto">
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
    </div>
  )
}

export default SortButtons
