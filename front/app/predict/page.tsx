import Card from '../components/Card'
import Header from '../components/Header'
import SpendingPredictionCard from './components/SpendingPredictionCard'
import GraphCard from './components/SpendingPredictionCard'

const monthlyData = [
  { month: 5, ammount: 153 },
  { month: 6, ammount: 288 },
  { month: 7, ammount: 163 },
  { month: 8, ammount: 222 },
  { month: 9, ammount: 80 },
  { month: 10, ammount: 161 },
]

const PredictPage = () => {
  return (
    <div className="bg-background-fill flex flex-col h-screen w-screen">
      <Header title="소비 예측" backButton />
      <div className="border-2 border-black w-full h-full py-16">
        <div className="border-2 border-error h-full overflow-auto p-5">
          <Card
            content={
              <SpendingPredictionCard
                amountList={monthlyData}
                comment={`한달에 평균 ${
                  monthlyData[monthlyData.length - 1].ammount
                }만원 정도 써요.`}
                type="vertical"
              />
            }
          />
        </div>
      </div>
    </div>
  )
}

export default PredictPage
