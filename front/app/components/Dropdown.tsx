import '../member/styles/style.css'

interface Props {
  sortType: 1 | 2 | 3
  onSortTypeChange: (value: 1 | 2 | 3) => void
}

const Dropdown = (props: Props) => {
  const onSortButtonClick = (value: 1 | 2 | 3) => {
    props.onSortTypeChange(value)
    const box = document.getElementById('sortOpen') as HTMLInputElement
    box.checked = false
    console.log(box.checked)
  }

  return (
    <div
      tabIndex={0}
      className="collapse collapse-arrow bg-white absolute top-0 right-0"
    >
      <input
        type="checkbox"
        className="h-[40px] min-h-0 w-full"
        id="sortOpen"
      />
      <div className="collapse-title text-base h-[40px] min-h-0 w-full text-left px-3 py-2">
        {props.sortType === 1
          ? '최신순'
          : props.sortType === 2
          ? '성공'
          : '실패'}
      </div>
      <div className=" collapse-content">
        <p
          className="text-left"
          onClick={() => {
            onSortButtonClick(1)
          }}
        >
          최신순
        </p>
        <p className="text-left" onClick={() => onSortButtonClick(2)}>
          성공
        </p>
        <p className="text-left" onClick={() => onSortButtonClick(3)}>
          실패
        </p>
      </div>
    </div>
  )
}

export default Dropdown
