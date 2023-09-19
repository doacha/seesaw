import MyStatisticDetailCard from './MyStatisticDetailCard'

const GroupStatisticCard = () => {
  return (
    <div className="w-full flex flex-col bg-white rounded-lg p-5 gap-3">
      <div className="self-start text-lg font-scDreamMedium">그룹 통계</div>
      <hr />

      <MyStatisticDetailCard
        icon="faCrown"
        iconColor="bg-error"
        title="알뜰왕"
        amount={56400}
        content="차차아버님"
      />
      <MyStatisticDetailCard
        icon="faSackDollar"
        iconColor="bg-primary"
        title="큰손"
        amount={220000}
        content="매국노봉준상"
      />
      <MyStatisticDetailCard
        icon="faFire"
        iconColor="bg-primary-container"
        title="과소비 대장"
        amount={80000}
        content="욕쟁이김한나"
      />
      <MyStatisticDetailCard
        icon="faLock"
        iconColor="bg-outline"
        title="밥은 먹고 다니냐"
        amount={1800}
        content="사랑해요 신한은행"
      />
    </div>
  )
}

export default GroupStatisticCard
