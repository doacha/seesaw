import MyMissionGraphbar from './MyMissionGraphBar'
import styles from '@/app/(mission)/mission/components/SearchContainer.module.css'
import { useEffect, useState } from 'react'
import { GroupStatusProps } from '@/app/types'
import { useMutation } from '@tanstack/react-query'

interface GraphState {
  boxHeight: number
  lengthList: number[]
  largestFailMoney: number
  largestSaveMoney: number
}

const getSavingMoney = async (input: {
  missionId: string
  memberEmail: string
}) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/record/saving-list`,
    {
      method: 'POST',
      body: JSON.stringify({
        missionId: input.missionId,
        memberEmail: input.memberEmail,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  ).then((res) => {
    let js = res.json()
    console.log('진짜결과', js)
    return js
  })
}
const HEIGHT_MAX = 100
const DUMMY_EMAIL = 'jiwon@seesaw.com'
const MySavingMoney = ({ propsData }: { propsData: GroupStatusProps }) => {
  const { mutate, data, isSuccess } = useMutation(getSavingMoney)
  const [graphState, setGraphState] = useState<GraphState>({
    boxHeight: 100,
    lengthList: [],
    largestFailMoney: 0,
    largestSaveMoney: 0,
  })

  useEffect(() => {
    mutate(
      { missionId: propsData.missionId, memberEmail: DUMMY_EMAIL },
      {
        onSuccess: (res) => {
          const fetchedData: GraphState = { ...graphState }
          ;(res as number[]).forEach((cost) => {
            fetchedData.largestFailMoney = Math.min(
              fetchedData.largestFailMoney,
              cost,
            )
            fetchedData.largestSaveMoney = Math.max(
              fetchedData.largestSaveMoney,
              cost,
            )
          })
          fetchedData.largestFailMoney = Math.max(
            fetchedData.largestFailMoney,
            -propsData.missionTargetPrice,
          )
          fetchedData.lengthList = (res as number[]).map((element) => {
            if (element < 0) {
              return (
                ((Math.abs(element) / propsData.missionTargetPrice) *
                  HEIGHT_MAX) /
                2
              )
            } else {
              return (
                (Math.abs(element) / propsData.missionTargetPrice) * HEIGHT_MAX
              )
            }
          })
          ;(fetchedData.boxHeight =
            15 +
            (fetchedData.largestSaveMoney * HEIGHT_MAX) /
              propsData.missionTargetPrice +
            (-fetchedData.largestFailMoney * HEIGHT_MAX) /
              (propsData.missionTargetPrice * 2) +
            50),
            setGraphState(fetchedData)
          console.log(fetchedData)
        },
        onError: (err) => console.log('누적 금액 에러', err),
      },
    )
  }, [])
  console.log('높이확인', graphState.boxHeight, propsData.missionTargetPrice)
  return (
    <div className="bg-background rounded-lg p-5 m-5">
      <div>절약 금액</div>
      <hr className="my-[15px] text-outline" />
      <div className="bg-background-fill rounded-sm p-5">
        <div className="text-sm mb-5">
          누적 금액{' '}
          <span className="text-primary font-scDreamExBold text-base mx-1">
            {(data as number[])?.reduce((prev, curr) => prev + curr, 0)}
          </span>
          원
        </div>
        {isSuccess && (
          <div
            dir="rtl"
            className={`overflow-x-auto ${styles.delScroll}`}
            style={{ height: `${graphState.boxHeight}px` }}
          >
            <div
              className="flex flex-row gap-5 justify-center pt-5"
              style={{ width: `${data?.length * 50 - 10}px` }}
            >
              {(data as number[])?.map((element, idx) => (
                <MyMissionGraphbar
                  round={idx + 1}
                  amount={element}
                  length={Math.min(graphState.lengthList[idx], HEIGHT_MAX)}
                  key={idx}
                  isToday={idx === 0}
                  labelHeight={
                    (-graphState.largestFailMoney * HEIGHT_MAX) /
                    propsData.missionTargetPrice /
                    2
                  }
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MySavingMoney
