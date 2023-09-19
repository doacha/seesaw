import VerticalGraphBar from '@/app/components/VerticalGraphBar'
// import styles from '@/app/(mission)/mission/components/SearchContainer.module.css'
import { useEffect, useState } from 'react'

const dummy = [
  {
    savingMoney: 3000,
    missionNumber: 1,
  },
  {
    savingMoney: 4000,
    missionNumber: 2,
  },
  {
    savingMoney: 3500,
    missionNumber: 3,
  },
  {
    savingMoney: 3800,
    missionNumber: 4,
  },
  {
    savingMoney: 2800,
    missionNumber: 5,
  },
  {
    savingMoney: 2900,
    missionNumber: 6,
  },
  {
    savingMoney: 4200,
    missionNumber: 7,
  },
  {
    savingMoney: 3000,
    missionNumber: 1,
  },
  {
    savingMoney: 4000,
    missionNumber: 2,
  },
  {
    savingMoney: 3500,
    missionNumber: 3,
  },
  {
    savingMoney: 3800,
    missionNumber: 4,
  },
  {
    savingMoney: 2800,
    missionNumber: 15,
  },
  {
    savingMoney: 2900,
    missionNumber: 6,
  },
  {
    savingMoney: 30000,
    missionNumber: 15,
  },
]

const targetPrice = 30000
const MySavingMoney = () => {
  const [lengthList, setLengthList] = useState<Array<string>>([])
  useEffect(() => {
    const averageAmount = dummy.reduce(
      (prev, curr) => {
        prev.savingMoney += curr.savingMoney
        return prev
      },
      { savingMoney: 0, missionNumber: 0 },
    ).savingMoney

    setLengthList(
      dummy.map((element) => (element.savingMoney / targetPrice) * 160 + 'px'),
    )
  }, [])
  return (
    <div className="bg-background rounded-lg p-5">
      <div>절약 금액</div>
      <hr className="my-[15px] text-outline" />
      <div className="bg-background-fill rounded-lg p-5">
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
        <div dir="rtl">
          <div className={`overflow-auto h-[210px]`}>
            <div className="flex flex-row gap-5 items-end">
              <div className="flex flex-col items-center gap-2">
                <div className={`text-primary text-[10px]`}>
                  {dummy[0].savingMoney.toLocaleString()}
                </div>
                <div
                  className={`bg-primary w-[30px] rounded-md`}
                  style={{ height: lengthList[0] }}
                ></div>
                <div className="text-xs w-fit whitespace-nowrap text-primary">
                  이번회
                </div>
              </div>
              {dummy
                .reverse()
                .map(
                  (element, idx) =>
                    idx > 0 && (
                      <VerticalGraphBar
                        round={element.missionNumber}
                        amount={element.savingMoney}
                        txtColor="text-black"
                        bgColor={
                          idx === 0 ? 'bg-primary' : 'bg-primary-container'
                        }
                        length={`-${lengthList[idx]}`}
                      />
                    ),
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MySavingMoney
