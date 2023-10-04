'use client'
import VerticalGraphBar from '@/app/components/VerticalGraphBar'
import GraphCardText from './GraphCardText'
import { useEffect, useState } from 'react'
import HorizontalGarphBar from '@/app/components/HorizontalGraphBar'

interface Props {
  type: 'vertical' | 'horizontal'
  amountList: {month : number, ammount : number}[]
  comment: string
}

const getAverageAmount = (list:{month : number, ammount : number}[]) => {
  let sum = 0
  for (let i = 0; i < list.length; i++) {
    sum += list[i].ammount
  }
  return sum / list.length
}

const SpendingPredictionCard = (props: Props) => {
  const [lengthList, setLengthList] = useState<string[]>([])
  const [averageAmount, setAvereageAmount] = useState<number>(
    getAverageAmount(props.amountList),
  )
  useEffect(() => {
    for (let i = 0; i < props.amountList.length; i++) {
      let tmp = `${Math.round((props.amountList[i].ammount / averageAmount) * 50)}px`
      setLengthList((prev) => [...prev, tmp])
    }
  }, [])

  return (
    <div className="relative w-full bg-background rounded-lg">
        {/* {props.type === 'vertical' ? (
          <div className="absolute w-[90%] h-[3px] bg-error-container top-[200px] rounded-full"></div>
        ) : null} */}

      <GraphCardText
        amount={
          props.type === 'vertical'
            ? props.amountList[props.amountList.length - 1].ammount
            : props.amountList[0].ammount > props.amountList[1].ammount
            ? props.amountList[0].ammount - props.amountList[1].ammount
            : props.amountList[1].ammount - props.amountList[0].ammount
        }
        comment={props.comment}
        txtColor={
          props.amountList[props.amountList.length - 1].ammount > averageAmount
            ? 'text-error'
            : 'text-primary'
        }
      />
      <div
        className={
          props.type === 'vertical'
            ? 'flex items-end justify-between'
            : 'flex flex-col gap-5 mt-5'
        }
      >
        {props.amountList.map((ammount, index) => (
          <VerticalGraphBar
            amount={ammount.ammount}
            length={lengthList[index]}
            round={ammount.month}
            bgColor={
              index === props.amountList.length - 1
                ? ammount.ammount < averageAmount
                  ? 'bg-primary'
                  : 'bg-error'
                : 'bg-primary-container'
            }
            txtColor={
              index === props.amountList.length - 1
                ? ammount.ammount < averageAmount
                  ? 'text-primary'
                  : 'text-error'
                : 'text-black'
            }
            type='월'
            key={index}
          />
        ))}
      </div>
    </div>
  )
}

export default SpendingPredictionCard
