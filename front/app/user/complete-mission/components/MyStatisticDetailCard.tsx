import StatisticIcon from './StatisticIcon'

const MyStatisticDetailCard = () => {
  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <StatisticIcon icon="faMoneyBill" color="bg-point-pink" />
        <div className="flex flex-col">
          <div>내 총 소비액</div>
          <div>30명 중 10등</div>
        </div>
      </div>
      <div className="text-xl font-scDreamMedium">196,840원</div>
    </div>
  )
}

export default MyStatisticDetailCard
