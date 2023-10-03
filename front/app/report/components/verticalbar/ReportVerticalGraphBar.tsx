import { useEffect } from 'react'

interface Props {
  spendingMonth?: number
  spendingYear?: string
  round?: number
  length: string
  amount?: number
  bgColor: string
  txtColor: string
  amountListLength: number
  activeCalendarTab: string
}

const ReportVerticalGraphBar = (props: Props) => {
  useEffect(() => {}, [props.activeCalendarTab])
  const ladel: string[] = ['월', '주차', '일']

  const getTabContent = () => {
    switch (props.activeCalendarTab) {
      case 'tab1':
        return (
          <div className="flex flex-col items-center">
            {props.amount && (
              <div className="text-[10px]">
                {props.amount.toLocaleString('ko-KR')}
              </div>
            )}
            <div
              className={`${props.bgColor} w-[30px] rounded-md mx-2`}
              style={{ height: props.length }}
            ></div>
            <div className="text-xs whitespace-nowrap">
              {props.spendingYear?.slice(-2) +
                '년' +
                props.spendingMonth +
                '월'}
            </div>
          </div>
        )
      case 'tab2':
        return (
          <div className="flex flex-col items-center">
            {props.amount && (
              <div className="text-[10px]">
                {props.amount.toLocaleString('ko-KR')}
              </div>
            )}
            <div
              className={`${props.bgColor} w-[30px] rounded-md mx-2`}
              style={{ height: props.length }}
            ></div>
            <div className="text-xs">
              {(props.round as number) + 1}
              {ladel[1]}
            </div>
          </div>
        )
      case 'tab3':
        return (
          <div className="flex flex-col items-center">
            {props.amount && (
              <div className="text-[10px]">
                {props.amount.toLocaleString('ko-KR')}
              </div>
            )}
            <div
              className={`${props.bgColor} w-[20px] rounded-md mx-2`}
              style={{ height: props.length }}
            ></div>
            <div className="text-xs">
              {(props.round as number) + 1}
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
