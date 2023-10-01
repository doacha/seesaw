import { GroupAverageInfo } from '@/app/types'
import GroupGraphCard from './GroupGraphCard'
import MyStatisticDetailCard from './MyStatisticDetailCard'
import { useQuery } from '@tanstack/react-query'
import Loading from '@/app/components/Loading'
import GraphCard from './GraphCard'

interface Props {
  missionId: string
}

const GroupStatisticCard = (props: Props) => {
  const getGroupAverageInfo = async () => {
    try {
      const res = await fetch(
        // `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/mission/compare/${props.missionId}`,
        `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/mission/compare/yzn5LMDMCG`,
      )
      const data: GroupAverageInfo = await res.json()
      return data
    } catch (err) {
      console.log(err)
    }
  }

  const { isLoading: groupAverageInfoLoading, data: groupAverageInfo } =
    useQuery(['getGroupAverageInfo'], getGroupAverageInfo)
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
      {groupAverageInfoLoading ? (
        <Loading />
      ) : (
        <GraphCard
          type="horizontal"
          textBefore="다른 미션보다 &nbsp;"
          currentAmount={groupAverageInfo?.difference? groupAverageInfo.difference<0 ? -Math.round(groupAverageInfo.difference) :Math.round(groupAverageInfo.difference) : 0}
          textAfter={
            groupAverageInfo?.difference ?? 0 < 0
              ? '적게 쓰셨어요.'
              : '더 쓰셨어요.'
          }
          comment="잘하셨어요! 꾸준히 아껴보자구요!"
          groupAverageInfo={groupAverageInfo}
        />
      )}
      <GroupGraphCard />
    </div>
  )
}

export default GroupStatisticCard
