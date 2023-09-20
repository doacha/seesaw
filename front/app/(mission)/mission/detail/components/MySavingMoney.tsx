import MissionGraphbar from './MissionGraphBar'
import styles from '@/app/(mission)/mission/components/SearchContainer.module.css'
import { useEffect, useState } from 'react'

const dummy = [
  {
    savingMoney: 30000,
    missionNumber: 43,
  },
  {
    savingMoney: 300000,
    missionNumber: 3,
  },
  {
    savingMoney: -3590,
    missionNumber: 2,
  },
  {
    savingMoney: -3500,
    missionNumber: 1,
  },
  {
    savingMoney: -10000,
    missionNumber: 4,
  },
  {
    savingMoney: 4000,
    missionNumber: 3,
  },
  {
    savingMoney: -3500,
    missionNumber: 332,
  },
  {
    savingMoney: -3500,
    missionNumber: 1,
  },
  {
    savingMoney: -3500,
    missionNumber: 1,
  },
  {
    savingMoney: -3500,
    missionNumber: 1,
  },
]

const targetPrice = 30000
const MySavingMoney = () => {
  const HEIGHT_MAX = 100
  const largestFailMoney = dummy.reduce(
    (prev, curr) => {
      prev.savingMoney = Math.min(prev.savingMoney, curr.savingMoney)
      return prev
    },
    { savingMoney: 0, missionNumber: 0 },
  ).savingMoney

  const [lengthList, setLengthList] = useState<Array<number>>([])
  useEffect(() => {
    setLengthList(
      dummy.map(
        (element) => (Math.abs(element.savingMoney) / targetPrice) * HEIGHT_MAX,
      ),
    )
  }, [])
  const boxHeight =
    15 + HEIGHT_MAX + (-largestFailMoney * HEIGHT_MAX) / targetPrice / 2 + 50
  // const lengthList = dummy.map(
  //   (element) => (Math.abs(element.savingMoney) / targetPrice) * 160,
  // )
  return (
    <div className="bg-background rounded-lg p-5 m-5">
      <div>절약 금액</div>
      <hr className="my-[15px] text-outline" />
      <div className="bg-background-fill rounded-sm p-5">
        <div className="text-sm">
          누적 금액{' '}
          <span className="text-primary font-scDreamExBold text-base mx-1">
            {dummy
              .reduce(
                (prev, curr) => {
                  prev.savingMoney += curr.savingMoney
                  return prev
                },
                { savingMoney: 0, missionNumber: 0 },
              )
              .savingMoney.toLocaleString()}
          </span>
          원
        </div>
        <div
          dir="rtl"
          className={`overflow-x-auto ${styles.delScroll}`}
          style={{ height: `${boxHeight}px` }}
        >
          <div
            className="flex flex-row gap-5 justify-center pt-5"
            style={{ width: `${dummy.length * 50 - 10}px` }}
          >
            {/* {Array(5)
              .fill(0)
              .map((element, idx) => (
                <MissionGraphbar
                  round={0}
                  amount={0}
                  length={0}
                  key={idx}
                  labelHeight={
                    (-largestFailMoney * HEIGHT_MAX) / targetPrice / 3
                  }
                />
              ))} */}
            {dummy.map((element, idx) => (
              <MissionGraphbar
                round={element.missionNumber}
                amount={element.savingMoney}
                length={Math.min(lengthList[idx], HEIGHT_MAX)}
                key={idx}
                isToday={idx === 0}
                labelHeight={(-largestFailMoney * HEIGHT_MAX) / targetPrice / 2}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MySavingMoney
