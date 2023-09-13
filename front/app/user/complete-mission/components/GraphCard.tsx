import VerticalGraphBar from '@/app/components/VerticalGraphBar'
import GraphCardText from './GraphCardText'
import { useEffect, useState } from 'react'

const amountList: number[] = [20000, 30000, 25000, 100000, 60000, 200000]
const averageAmount = () => {
  let sum = 0
  for (let i = 0; i < amountList.length; i++) {
    sum += amountList[i]
  }
  return sum / amountList.length
}

const GraphCard = () => {
  const [lengthList, setLengthList] = useState<string[]>([])
  useEffect(() => {
    for (let i = 0; i < amountList.length; i++) {
      let tmp = `${Math.round((amountList[i] / averageAmount()) * 50)}px`
      setLengthList((prev) => [...prev, tmp])
    }
  }, [])

  return (
    <div className="w-full bg-background-fill p-5 rounded-lg">
      <GraphCardText
        textBefore="오늘은&nbsp;"
        amount={amountList[amountList.length - 1]}
        textAfter="원을 썼어요."
        comment="소비가 늘어나셨네요. 이런!"
      />
      <div className="flex items-end justify-between">
        {amountList.map((amount, index) => (
          <VerticalGraphBar
            amount={amount}
            length={lengthList[index]}
            round={index}
            bgColor={
              index === amountList.length - 1 ? 'bg-secondary' : 'bg-white'
            }
            txtColor={
              index === amountList.length - 1 ? 'text-secondary' : 'text-black'
            }
            key={index}
          />
        ))}
      </div>
    </div>
  )
}

export default GraphCard
