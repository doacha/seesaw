interface Props {
  round: number
  length: number
  amount: number
  isToday?: boolean
  labelHeight: number
}

// 잔액 절댓갑셍 대한 length를 받는다
// 최상위 div의 h를 2 * length로 잡고 relative화 해준다
// 하위 div로 막대기 (absolute, top-0 or bottom-0, color 세팅) 잡아준다.
// 금액 또한 absolute로 최상위 div의 하위 div로서 잡아준다.

// 첫번째 컴포넌트도 확인할 수 있는 ~

const MyMissionGraphBar = (props: Props) => {
  const [bgPrimaryColor, bgColor, textColor, position, textPosition] =
    props.amount >= 0
      ? [
          'bg-primary',
          'bg-primary-container',
          'text-primary',
          'top-0',
          'top-[-16px]',
        ]
      : ['bg-error', 'bg-red-200', 'text-error', 'bottom-0', 'bottom-[-16px]']
  const sign = props.amount < 0 ? '-' : ''
  const absAmount = Math.abs(props.amount)
  return (
    <div className="flex items-center relative">
      {/* 막대 파트 */}
      <div
        className="relative w-[30px]"
        style={{ height: `${props.length * 2}px` }}
      >
        <div
          className={`${
            props.isToday ? bgPrimaryColor : bgColor
          } rounded-md absolute w-[30px]`}
          // className={`${
          //   props.isToday ? bgPrimaryColor : bgColor
          // } rounded-md absolute ${position} w-[30px]`}
          style={{
            height: `${props.amount < 0 ? props.length / 2 : props.length}px`,
            bottom: `${props.amount < 0 ? props.length / 2 : props.length}px`,
          }}
        >
          <div
            className={`absolute ${textPosition} left-[50%] translate-x-[-50%] whitespace-nowrap text-[10px]`}
          >
            {absAmount.toLocaleString('ko-KR') + sign}
          </div>
        </div>
        <div
          className="absolute top-[50%] left-0 w-full"
          style={{ height: `${props.labelHeight}px` }}
        >
          {/* 회차 파트 */}
          <div
            className={`${
              props.isToday ? textColor : 'text-black'
            } absolute bottom-[-35px] text-xs whitespace-nowrap left-[50%] translate-x-[-50%]`}
          >
            {props.isToday ? '지금' : props.round + '회차'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyMissionGraphBar
