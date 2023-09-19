import GraphCard from './GraphCard'
import MyStatisticDetailCard from './MyStatisticDetailCard'

const amountList: number[] = [20000, 30000, 25000, 100000, 60000, 200000]
const averageAmountList: number[] = [210000, 182000]

const MystatisticCard = () => {
  return (
    <div className="w-full flex flex-col bg-white rounded-lg p-5 gap-5">
      <div className="self-start text-lg font-scDreamMedium">내 통계</div>
      <hr />
      <MyStatisticDetailCard
        title="총 소비 금액"
        content="30명 중 1등"
        amount={196840}
        icon="faMoneyBills"
        iconColor="bg-error"
      />
      <MyStatisticDetailCard
        title="평균 소비 금액"
        content="총 20회"
        amount={196840 / 20}
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
