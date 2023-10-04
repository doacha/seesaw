import { useQuery } from '@tanstack/react-query'
import GraphCard from './GraphCard'
import MyStatisticDetailCard from './MyStatisticDetailCard'
import { memberEmailStore } from '@/stores/memberEmail'
import Loading from '@/app/components/Loading'
import { Record, SavedAmount } from '@/app/types'
import { currentMissionIdStore } from '@/stores/currentMissionId'

const MystatisticCard = () => {
  const { memberEmail } = memberEmailStore()
  const { currentMissionId } = currentMissionIdStore()
  const getCompleteMissionStat = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/mission/mystats`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            missionId: currentMissionId,
            memberEmail: memberEmail,
          }),
        },
      )
      const data = await res.json()
      return data
    } catch (err) {
      console.log(err)
    }
  }

  const getLatestRecord = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/mission/recentstats`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            missionId: currentMissionId,
            memberEmail: memberEmail,
          }),
        },
      )
      const data: Record[] = await res.json()
      return data
    } catch (err) {
      console.log(err)
    }
  }

  const getCurrentAmount = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/mission/periodsum`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            missionId: currentMissionId,
            memberEmail: memberEmail,
          }),
        },
      )
      const data: number = await res.json()
      return data
    } catch (err) {
      console.log(err)
    }
  }

  const getSavedAmount = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/mission/saving`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            missionId: currentMissionId,
            memberEmail: memberEmail,
          }),
        },
      )
      const data: SavedAmount = await res.json()
      return data
    } catch (err) {
      console.log(err)
    }
  }

  //userQuery로 실행하는 통계 데이터
  const {
    isLoading,
    data: completeMissionStat,
    error,
  } = useQuery(['getCompleteMissionStat'], getCompleteMissionStat)

  const { isLoading: graphInfoLoading, data: latestRecord } = useQuery(
    ['getLatestRecord'],
    getLatestRecord,
  )
  const { isLoading: graphCurrentInfoLoading, data: currentAmount } = useQuery(
    ['getCurrentAmount'],
    getCurrentAmount,
  )

  const { isLoading: savedAmountLoading, data: savedAmount } = useQuery(
    ['getSavedAmount'],
    getSavedAmount,
  )

  return (
    <div className="w-full flex flex-col bg-white rounded-lg p-5 gap-5">
      <div>
        <div className="self-start text-lg font-scDreamMedium mb-1">
          내 통계
        </div>
        <hr />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <MyStatisticDetailCard
          title="총 소비 금액"
          content={`${completeMissionStat.missionMemberCount}명 중 ${completeMissionStat.ranking}등`}
          amount={completeMissionStat.sum}
          icon="faMoneyBills"
          iconColor="bg-error"
        />
      )}
      {isLoading ? (
        <Loading />
      ) : (
        <MyStatisticDetailCard
          title="평균 소비 금액"
          content={`총 ${completeMissionStat.count}회`}
          amount={Math.round(completeMissionStat.average)}
          icon="faMoneyBill1"
          iconColor="bg-secondary-container"
        />
      )}
      {graphInfoLoading || graphCurrentInfoLoading ? (
        <Loading />
      ) : (
        <GraphCard
          type="vertical"
          textBefore="현재&nbsp;"
          recordList={latestRecord ?? []}
          currentAmount={currentAmount ?? 0}
          textAfter="을 썼어요."
        />
      )}
      {savedAmountLoading ? (
        <Loading />
      ) : (
        <GraphCard
          type="horizontal"
          textBefore="미션으로&nbsp;"
          savedAmount={savedAmount}
          currentAmount={
            savedAmount?.difference
              ? savedAmount.difference > 0
                ? Math.round(savedAmount.difference)
                : -Math.round(savedAmount.difference)
              : 0
          }
          textAfter={
            savedAmount?.difference
              ? savedAmount?.difference < 0
                ? ' 만큼 절약하셨어요!'
                : ' 만큼 더 쓰셨네요.'
              : ''
          }
          comment={
            savedAmount?.difference
              ? savedAmount.difference < 0
                ? '미션을 성공적으로 수행하셨어요!'
                : '다음 번엔 조금 더 열심히 해보자구요.'
              : ''
          }
        />
      )}
    </div>
  )
}

export default MystatisticCard
