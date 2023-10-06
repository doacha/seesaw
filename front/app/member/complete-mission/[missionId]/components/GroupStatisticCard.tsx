import { GroupAverageInfo, MissionRanking } from '@/app/types'
import GroupGraphCard from './GroupGraphCard'
import MyStatisticDetailCard from './MyStatisticDetailCard'
import { useQuery } from '@tanstack/react-query'
import Loading from '@/app/components/Loading'
import GraphCard from './GraphCard'
import { currentMissionIdStore } from '@/stores/currentMissionId'

const GroupStatisticCard = () => {
  const { currentMissionId } = currentMissionIdStore()
  const getGroupAverageInfo = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/mission/compare/${currentMissionId}`,
      )
      const data: GroupAverageInfo = await res.json()
      return data
    } catch (err) {
      console.log(err)
    }
  }

  const getMissionRanking = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/mission/ranking/${currentMissionId}`,
      )
      const data: MissionRanking = await res.json()
      return data
    } catch (err) {
      console.log(err)
    }
  }

  const { isLoading: groupAverageLoading, data: groupAverageInfo } = useQuery(
    ['getGroupAverageInfo'],
    getGroupAverageInfo,
  )

  const { isLoading: missionRankingLoading, data: missionRanking } = useQuery(
    ['getMissionRanking'],
    getMissionRanking,
  )
  return (
    <div className="w-full flex flex-col bg-white rounded-lg p-5 gap-5">
      <div>
        <div className="self-start text-lg font-scDreamMedium mb-1">
          그룹 통계
        </div>
        <hr />
      </div>
      {missionRankingLoading ? null : (
        <div className="flex flex-col gap-5">
          <MyStatisticDetailCard
            icon="faCrown"
            iconColor="bg-secondary"
            title="알뜰왕"
            amount={missionRanking?.missionFrugalSpending ?? 0}
            content={missionRanking?.missionFrugalSpender ?? '닉네임'}
          />
          <MyStatisticDetailCard
            icon="faSackDollar"
            iconColor="bg-primary"
            title="큰손"
            amount={missionRanking?.missionTopSpending ?? 0}
            content={missionRanking?.missionTopSpender ?? '닉네임'}
          />
          <MyStatisticDetailCard
            icon="faFire"
            iconColor="bg-error"
            title="과소비 대장"
            amount={missionRanking?.recordTopSpending ?? 0}
            content={missionRanking?.recordTopSpender ?? '닉네임'}
            round={missionRanking?.recordTopSpendingNum ?? 0}
          />
        </div>
      )}

      {groupAverageLoading ? (
        <Loading />
      ) : (
        <GraphCard
          type="horizontal"
          textBefore="다른 미션들의 평균보다&nbsp;"
          currentAmount={
            groupAverageInfo?.difference
              ? groupAverageInfo.difference > 0
                ? Math.round(groupAverageInfo.difference)
                : -Math.round(groupAverageInfo.difference)
              : 0
          }
          textAfter={
            groupAverageInfo?.difference
              ? groupAverageInfo?.difference < 0
                ? ' 더 쓰셨어요.'
                : ' 적게 쓰셨어요.'
              : ''
          }
          comment={
            groupAverageInfo?.difference
              ? groupAverageInfo.difference < 0
                ? '다음엔 조금 더 어려운 미션에 참여해볼까요?'
                : '의지력이 대단한걸요?!'
              : ''
          }
          groupAverageInfo={groupAverageInfo}
        />
      )}
      <GroupGraphCard />
    </div>
  )
}

export default GroupStatisticCard
