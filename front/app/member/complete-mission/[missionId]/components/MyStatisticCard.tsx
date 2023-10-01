import { useQuery } from '@tanstack/react-query'
import GraphCard from './GraphCard'
import MyStatisticDetailCard from './MyStatisticDetailCard'
import { memberEmailStore } from '@/stores/memberEmail'
import TransactionLoading from '@/app/member/components/account/TransactionLoading'
import Loading from '@/app/components/Loading'
import { Record } from '@/app/types'

interface Props {
  missionId: string
}

const amountList: number[] = [20000, 30000, 25000, 100000, 60000, 200000]
const averageAmountList: number[] = [210000, 182000]

const MystatisticCard = (props: Props) => {
  const { memberEmail } = memberEmailStore()

  const getCompleteMissionStat = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/mission/mystats`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // body: JSON.stringify({missionId : props.missionId, memberEmail: memberEmail})
          body: JSON.stringify({
            missionId: 'yzn5LMDMCG',
            memberEmail: 'doacha@seesaw.com',
          }),
        },
      )
      const data = await res.json()
      console.log(data)
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
          // body: JSON.stringify({missionId : props.missionId, memberEmail: memberEmail})
          body: JSON.stringify({
            missionId: 'yzn5LMDMCG',
            memberEmail: 'doacha@seesaw.com',
          }),
        },
      )
      const data : Record[] = await res.json()
      console.log("경호요청",data)
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
          // body: JSON.stringify({missionId : props.missionId, memberEmail: memberEmail})
          body: JSON.stringify({
            missionId: 'yzn5LMDMCG',
            memberEmail: 'doacha@seesaw.com',
          }),
        },
      )
      const data : number = await res.json()
      console.log("경호요청2",data)
      return data
    } catch (err) {
      console.log(err)
    }
  }

  const {
    isLoading,
    data: completeMissionStat,
    error,
  } = useQuery(['getCompleteMissionStat'], getCompleteMissionStat)

  const {isLoading: graphInfoLoading, data : latestRecord} = useQuery(['getLatestRecord'],getLatestRecord)
  const {isLoading : graphCurrentInfoLoading, data : currentAmount } = useQuery(['getCurrentAmount'],getCurrentAmount)
  return (
    <div className="w-full flex flex-col bg-white rounded-lg p-5 gap-5">
      <div className="self-start text-lg font-scDreamMedium">내 통계</div>
      <hr />
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
          amount={completeMissionStat.average}
          icon="faMoneyBill1"
          iconColor="bg-secondary-container"
        />
      )}
      {graphInfoLoading || graphCurrentInfoLoading ? <Loading/> :<GraphCard
        type="vertical"
        textBefore="현재&nbsp;"
        recordList={latestRecord??[]}
        currentAmount = {currentAmount?? 0} 
        textAfter="을 썼어요."
      /> }
      
      {/* <GraphCard
        type="horizontal"
        textBefore="미션으로&nbsp;"
        amountList={averageAmountList}
        textAfter="원을 절약했어요."
        comment="잘하셨어요! 꾸준히 아껴보자구요!"
      /> */}
    </div>
  )
}

export default MystatisticCard
