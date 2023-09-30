import { useQuery } from '@tanstack/react-query'
import GraphCard from './GraphCard'
import MyStatisticDetailCard from './MyStatisticDetailCard'
import { memberEmailStore } from '@/stores/memberEmail'

interface Props{
  missionId : string
}

const amountList: number[] = [20000, 30000, 25000, 100000, 60000, 200000]
const averageAmountList: number[] = [210000, 182000]






const MystatisticCard = (props:Props) => {

  const {memberEmail} = memberEmailStore()

  const getMyCompleteMissionStat = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/mission/my-stats`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // body: JSON.stringify({missionId : props.missionId, memberEmail: memberEmail})
          body: JSON.stringify({
            "missionId": "yzn5LMDMCG",
            "memberEmail": "doacha@seesaw.com"
            })

        },
      )
      const data = await res.json()
      // console.log(data)
      return data
    } catch (err) {
      console.log(err)
    }
  }

  getMyCompleteMissionStat()
  // const {isLoading, data : myCompleteMissionStat, error} = useQuery(['getMyCompleteMissionStat'], getMyCompleteMissionStat)

  const myCompleteMissionStat = {
    "missionId": "yzn5LMDMCG",
    "sum": 206700,
    "ranking": 3,
    "memberEmail": "doacha@seesaw.com",
    "average": 34450,
    "count": 6
  }

  return (
    <div className="w-full flex flex-col bg-white rounded-lg p-5 gap-5">
      <div className="self-start text-lg font-scDreamMedium">내 통계</div>
      <hr />
      <MyStatisticDetailCard
        title="총 소비 금액"
        content={`30명 중 ${myCompleteMissionStat.ranking}등`}
        amount= {myCompleteMissionStat.sum}
        icon="faMoneyBills" 
        iconColor="bg-error"
      />
      <MyStatisticDetailCard
        title="평균 소비 금액"
        content={`총 ${myCompleteMissionStat.count}회`}
        amount={myCompleteMissionStat.average}
        icon="faMoneyBill1"
        iconColor="bg-secondary-container"
      />
      <GraphCard
        type="vertical"
        textBefore="오늘은&nbsp;"
        amountList={amountList}
        textAfter="원을 썼어요."
        comment="소비가 늘어나셨네요. 이런!"
      />
      <GraphCard
        type="horizontal"
        textBefore="미션으로&nbsp;"
        amountList={averageAmountList}
        textAfter="원을 절약했어요."
        comment="잘하셨어요! 꾸준히 아껴보자구요!"
      />
    </div>
  )
}

export default MystatisticCard
