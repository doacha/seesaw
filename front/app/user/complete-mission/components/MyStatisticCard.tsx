import GraphCard from './GraphCard'
import MyStatisticDetailCard from './MyStatisticDetailCard'

const MystatisticCard = () => {
  return (
    <div className="w-full flex flex-col bg-white rounded-lg p-5 gap-3">
      <div className="self-start text-lg font-scDreamMedium">내 통계</div>
      <hr />
      <MyStatisticDetailCard />
      <MyStatisticDetailCard />
      <GraphCard />
    </div>
  )
}

export default MystatisticCard
