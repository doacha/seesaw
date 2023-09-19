interface Props {
  round: number
  length: number
  amount: number
  isToday?: boolean
  bgColor: string
  txtColor: string
}

// 잔액 절댓갑셍 대한 length를 받는다
// 최상위 div의 h를 2 * length로 잡고 relative화 해준다
// 하위 div로 막대기 (absolute, top-0 or bottom-0, color 세팅) 잡아준다.
// 금액 또한 absolute로 최상위 div의 하위 div로서 잡아준다.

// 첫번째 컴포넌트도 확인할 수 있는 ~

const MissionGraphBar = (props: Props) => {
  const [bgColor, position, textPosition] =
    props.amount >= 0
      ? ['bg-primary-container', 'top-0', 'top-[-10px]']
      : ['bg-seesaw-red-100', 'bottom-0', 'bottom-[-10px]']
  console.log(props.length, '기리')

  return (
    <div
      className="flex flex-col items-center gap-2 bg-background-fill relative"
      style={{ height: `${props.length * 2}px` }}
    >
      <div className={`text-black text-[10px] absoulte ${textPosition}`}>
        {props.amount.toLocaleString()}
      </div>
      <div
        className={`${bgColor} w-[30px] rounded-md absolute bottom-0 ${position}`}
        style={{ height: `${props.length}px` }}
      ></div>
      <div className="text-xs w-fit whitespace-nowrap">{props.round}회차</div>
    </div>
  )
}

export default MissionGraphBar
