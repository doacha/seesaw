import { useState, useEffect } from 'react'
import ReportVerticalGraphBar from './ReportVerticalGraphBar'

interface MonthSumGraphCardProps {
  handleCalendarTabChange: (tab: string) => void
  activeCalendarTab: string
  groupedSpending: Record<string, number>
}

const MonthSumGraphCard: React.FC<MonthSumGraphCardProps> = ({
  handleCalendarTabChange,
  activeCalendarTab,
  groupedSpending,
}) => {
  let valuesArray: number[] = Object.values(groupedSpending)

  const averageAmount = () => {
    let sum = 0
    for (let i = 0; i < valuesArray.length; i++) {
      sum += valuesArray[i]
    }
    return sum / valuesArray.length
  }

  const [lengthList, setLengthList] = useState<string[]>([])
  const [meanLength, setMeanLength] = useState<string>('')

  useEffect(() => {
    let mean = 0
    const tmpLengthList: string[] = []

    for (let i = 0; i < valuesArray.length; i++) {
      const tmp = `${(Math.round(valuesArray[i]) / averageAmount()) * 100}px`
      mean += (Math.round(valuesArray[i]) / averageAmount()) * 100
      tmpLengthList.push(tmp)
    }

    setLengthList(tmpLengthList)
    setMeanLength('h-[' + Math.round(mean / valuesArray.length) + 'px]')

    console.log(tmpLengthList)
    console.log(mean)
  }, [])

  return (
    <>
      <div className="w-full">
        <div className="flex justify-between h-fit bg-blue-100 m-5 px-5 pt-10 pb-5 rounded-lg">
          {valuesArray.map((amount, index) => (
            <>
              <div className="flex items-end justify-between">
                <ReportVerticalGraphBar
                  amount={amount}
                  length={lengthList[index]}
                  round={index}
                  bgColor={
                    index === valuesArray.length - 1
                      ? 'bg-primary'
                      : 'bg-blue-300'
                  }
                  txtColor={
                    index === valuesArray.length - 1
                      ? 'text-secondary'
                      : 'text-black'
                  }
                  key={index}
                  amountListLength={valuesArray.length}
                  activeCalendarTab={activeCalendarTab}
                />
              </div>
            </>
          ))}
        </div>
      </div>
      <div className="mx-5 mb-5 p-2 bg-slate-100 rounded-lg flex justify-between">
        <div className="ml-1 my-auto font-scDreamRegular text-xs">
          평균지출금액
        </div>
        <div className="my-auto text-xs font-scDreamExBold">
          {Math.round(averageAmount()).toLocaleString('ko-KR')}원
        </div>
      </div>
    </>
  )
}

export default MonthSumGraphCard
