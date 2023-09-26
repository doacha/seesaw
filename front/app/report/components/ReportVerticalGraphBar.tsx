interface Props {
  round: number
  length: string
  amount?: number
  bgColor: string
  txtColor: string
  amountListLength: number
  activeCalendarTab: string
}

const ReportVerticalGraphBar = (props: Props) => {
  const ladel: string[] = ['월', '주차', '일']

  const getTabContent = () => {
    switch (props.activeCalendarTab) {
      case 'tab1':
        return (
          <div className="flex flex-col items-center">
            {/* 월이면 w-20px, 일이면 10px, 주면 w-30 */}
            {props.amount && props.round === props.amountListLength - 1 && (
              <div
                className="tooltip tooltip-open"
                data-tip={`${props.amount.toLocaleString('ko-KR')}`}
              ></div>
            )}
            <div
              className={`${props.bgColor} w-[20px] rounded-md mx-2`}
              style={{ height: props.length }}
            ></div>
            <div className="text-xs">
              {props.round + 1}
              {ladel[0]}
            </div>
          </div>
        )
      case 'tab2':
        return (
          <div className="flex flex-col items-center">
            {props.amount && props.round === props.amountListLength - 1 && (
              <div
                className="tooltip tooltip-open"
                data-tip={`${props.amount.toLocaleString('ko-KR')}`}
              ></div>
            )}
            <div
              className={`${props.bgColor} w-[30px] rounded-md mx-2`}
              style={{ height: props.length }}
            ></div>
            <div className="text-xs">
              {props.round + 1}
              {ladel[1]}
            </div>
          </div>
        )
      case 'tab3':
        return (
          <div className="flex flex-col items-center">
            {props.amount && props.round === props.amountListLength - 1 && (
              <div
                className="tooltip tooltip-open"
                data-tip={`${props.amount.toLocaleString('ko-KR')}`}
              ></div>
            )}
            <div
              className={`${props.bgColor} w-[20px] rounded-md mx-2`}
              style={{ height: props.length }}
            ></div>
            <div className="text-xs">
              {props.round + 1}
              {ladel[2]}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return getTabContent()
}

export default ReportVerticalGraphBar
