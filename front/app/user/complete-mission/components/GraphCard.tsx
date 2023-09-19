import VerticalGraphBar from '@/app/components/VerticalGraphBar'
import GraphCardText from './GraphCardText'
import { useEffect, useState } from 'react'
import HorizontalGarphBar from '@/app/components/HorizontalGraphBar'

interface Props {
  type: 'vertical' | 'horizontal'
  textBefore: string
  amountList: number[]
  textAfter: string
  comment: string
}

const getAverageAmount = (list: number[]) => {
  let sum = 0
  for (let i = 0; i < list.length; i++) {
    sum += list[i]
  }
  return sum / list.length
}

const GraphCard = (props: Props) => {
  const [lengthList, setLengthList] = useState<string[]>([])
  const [averageAmount, setAvereageAmount] = useState<number>(
    getAverageAmount(props.amountList),
  )
  useEffect(() => {
    for (let i = 0; i < props.amountList.length; i++) {
      let tmp = `${Math.round((props.amountList[i] / averageAmount) * 50)}px`
      setLengthList((prev) => [...prev, tmp])
    }
  }, [])

  return (
    <div className="relative w-full bg-background-fill p-5 rounded-lg">
      {props.type === 'vertical' ? (
        <div className="absolute w-[90%] h-[3px] bg-error-container top-[200px] rounded-full"></div>
      ) : null}

      <GraphCardText
        textBefore={props.textBefore}
        amount={
          props.type === 'vertical'
            ? props.amountList[props.amountList.length - 1]
            : props.amountList[0] > props.amountList[1]
            ? props.amountList[0] - props.amountList[1]
            : props.amountList[1] - props.amountList[0]
        }
        textAfter={props.textAfter}
        comment={props.comment}
        txtColor={
          props.amountList[props.amountList.length - 1] > averageAmount
            ? 'text-error'
            : 'text-secondary'
        }
      />
      <div
        className={
          props.type === 'vertical'
            ? 'flex items-end justify-between'
            : 'flex flex-col gap-5 mt-5'
        }
      >
        {props.type === 'vertical'
          ? props.amountList.map((amount, index) => (
              <VerticalGraphBar
                amount={amount}
                length={lengthList[index]}
                round={index}
                bgColor={
                  index === props.amountList.length - 1
                    ? amount < averageAmount
                      ? 'bg-secondary'
                      : 'bg-error'
                    : 'bg-white'
                }
                txtColor={
                  index === props.amountList.length - 1
                    ? amount < averageAmount
                      ? 'text-secondary'
                      : 'text-error'
                    : 'text-black'
                }
                key={index}
              />
            ))
          : props.amountList.map((amount, index) => (
              <HorizontalGarphBar
                amount={amount}
                length={lengthList[index]}
                title={'이전'}
                bgColor={
                  index === props.amountList.length - 1
                    ? 'bg-secondary'
                    : 'bg-white'
                }
                txtColor={
                  index === props.amountList.length - 1
                    ? 'text-secondary'
                    : 'text-black'
                }
                key={index}
              />
            ))}
      </div>
    </div>
  )
}

export default GraphCard
