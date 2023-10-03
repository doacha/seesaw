import VerticalGraphBar from '@/app/components/VerticalGraphBar'
import GraphCardText from './GraphCardText'
import { useEffect, useState } from 'react'
import HorizontalGarphBar from '@/app/components/HorizontalGraphBar'
import { GroupAverageInfo, Record, SavedAmount } from '@/app/types'
import AverageCount from './AverageCount'

interface Props {
  type: 'vertical' | 'horizontal'
  textBefore: string
  recordList?: Record[]
  groupAverageInfo?: GroupAverageInfo
  savedAmount?: SavedAmount
  currentAmount: number
  textAfter: string
  comment?: string
}

const getAverageAmount = (list: Record[]) => {
  let sum = 0
  for (let i = 0; i < list.length; i++) {
    sum += list[i].recordTotalCost
  }
  return sum / list.length
}

const GraphCard = (props: Props) => {
  const [lengthList, setLengthList] = useState<string[]>([])
  const [averageAmount, setAvereageAmount] = useState<number>(
    props.recordList
      ? getAverageAmount(props.recordList)
      : props.groupAverageInfo
      ? (props.groupAverageInfo.entireAverage +
          props.groupAverageInfo.missionAverage) /
        2
      : props.savedAmount
      ? (props.savedAmount.missionTotalCost + props.savedAmount.pastTotalCost) /
        2
      : 0,
  )

  const [currentAmountHeight, setCurrnetAmountHeight] = useState<string>(
    `${Math.round((props.currentAmount / averageAmount) * 70)}px`,
  )

  useEffect(() => {
    if (props.recordList) {
      for (let i = 0; i < props.recordList.length; i++) {
        let tmp = `${Math.round(
          (props.recordList[i].recordTotalCost / averageAmount) * 70,
        )}px`
        setLengthList((prev) => [...prev, tmp])
      }
    } else if (props.groupAverageInfo) {
      let entireLength = `${Math.round(
        (props.groupAverageInfo.entireAverage / averageAmount) * 100,
      )}px`
      let groupLength = `${Math.round(
        (props.groupAverageInfo.missionAverage / averageAmount) * 100,
      )}px`

      setLengthList([entireLength, groupLength])
    } else if (props.savedAmount) {
      let pastLength = `${Math.round(
        (props.savedAmount.pastTotalCost / averageAmount) * 100,
      )}px`
      let missionLength = `${Math.round(
        (props.savedAmount.missionTotalCost/ averageAmount) * 100,
      )}px`

      setLengthList([pastLength, missionLength])
    }
  }, [])

  return (
    <div className="relative w-full bg-background-fill p-5 rounded-lg">
      {props.type === 'vertical' ? (
        <div
          className={`flex flex-col absolute w-[calc(100%-40px)] bottom-[114px] items-start animate-slideUp`}
        >
          <div
            className={
              averageAmount > props.currentAmount
                ? 'flex text-[10px] min-w-max text-secondary  font-scDreamLight '
                : 'flex text-[10px] min-w-max text-error  font-scDreamLight '
            }
          >
            <AverageCount value={averageAmount} />
          </div>
          <div
            className={
              averageAmount > props.currentAmount
                ? ' bg-secondary-container  rounded-full w-full h-[3px] '
                : ' bg-error-container  rounded-full w-full h-[3px] '
            }
          />
        </div>
      ) : null}

      <GraphCardText
        textBefore={props.textBefore}
        amount={props.currentAmount}
        textAfter={props.textAfter}
        comment={
          props.comment
            ? props.comment
            : averageAmount > props.currentAmount
            ? '여전히 절약하고 계시군요. 훌륭해요!'
            : '다시 소비가 늘어나셨네요! 이런! '
        }
        txtColor={
          props.groupAverageInfo
            ? props.currentAmount > props.groupAverageInfo.missionAverage
              ? 'text-secondary'
              : 'text-error'
            : averageAmount > props.currentAmount
            ? 'text-secondary'
            : 'text-error'
        }
      />

      {props.type === 'vertical' ? (
        <div className="flex items-end justify-between mt-5">
          {props.recordList
            ?.reverse()
            .map((record, index) => (
              <VerticalGraphBar
                amount={record.recordTotalCost}
                length={lengthList[lengthList.length - 1 - index]}
                round={record.recordNumber}
                bgColor="bg-white"
                txtColor="text-black"
                type="회차"
                key={index}
              />
            ))}
          <VerticalGraphBar
            amount={props.currentAmount}
            length={currentAmountHeight}
            bgColor={
              props.currentAmount < averageAmount ? 'bg-secondary' : 'bg-error'
            }
            txtColor={
              props.currentAmount < averageAmount
                ? 'text-secondary'
                : 'text-error'
            }
            type="현재"
          />
        </div>
      ) : (
        <div className="flex flex-col items-start justify-between mt-5">
          {props.recordList?.map((record, index) => (
            <HorizontalGarphBar
              amount={record.recordTotalCost}
              length={lengthList[index]}
              title={'이전'}
              height="big"
              unitType="won"
              bgColor={
                props.recordList
                  ? index === props.recordList.length - 1
                    ? 'bg-secondary'
                    : 'bg-white'
                  : ''
              }
              txtColor={
                props.recordList
                  ? index === props.recordList.length - 1
                    ? 'text-secondary'
                    : 'text-black'
                  : ''
              }
              key={index}
            />
          ))}

          {props.groupAverageInfo ? (
            <div className="flex flex-col gap-5">
              <HorizontalGarphBar
                amount={Math.round(props.groupAverageInfo.entireAverage)}
                bgColor="bg-white"
                height="big"
                length={lengthList[0]}
                title="전체"
                txtColor="text-black"
                unitType="won"
              />
              <HorizontalGarphBar
                amount={Math.round(props.groupAverageInfo.missionAverage)}
                bgColor={
                  props.groupAverageInfo.entireAverage >
                  props.groupAverageInfo.missionAverage
                    ? 'bg-secondary'
                    : 'bg-error'
                }
                height="big"
                length={lengthList[1]}
                title="미션"
                txtColor={
                  props.groupAverageInfo.entireAverage >
                  props.groupAverageInfo.missionAverage
                    ? 'text-secondary'
                    : 'text-error'
                }
                unitType="won"
              />
            </div>
          ) : null}

          {props.savedAmount ? (
            <div className="flex flex-col gap-5">
              <HorizontalGarphBar
                amount={Math.round(props.savedAmount.pastTotalCost)}
                bgColor="bg-white"
                height="big"
                length={lengthList[0]}
                title="이전"
                txtColor="text-black"
                unitType="won"
              />
              <HorizontalGarphBar
                amount={Math.round(props.savedAmount.missionTotalCost)}
                bgColor={
                  props.savedAmount.missionTotalCost <
                  props.savedAmount.pastTotalCost
                    ? 'bg-secondary'
                    : 'bg-error'
                }
                height="big"
                length={lengthList[1]}
                title="이후"
                txtColor={
                  props.savedAmount.missionTotalCost <
                  props.savedAmount.pastTotalCost
                    ? 'text-secondary'
                    : 'text-error'
                }
                unitType="won"
              />
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default GraphCard
