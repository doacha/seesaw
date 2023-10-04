import { categoryIcon, categoryList } from '@/app/lib/constants'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import CategorizedGraph from './CategorizedGraph'
import GraphCardText from './GraphCardText'
import { useQuery } from '@tanstack/react-query'
import { memberEmailStore } from '@/stores/memberEmail'
import { currentMissionIdStore } from '@/stores/currentMissionId'
import { MissionCompareList } from '@/app/types'

const GroupGraphInfo = () => {
  const { memberEmail } = memberEmailStore()
  const { currentMissionId } = currentMissionIdStore()
  const getMissionCompareList = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/mission/comparelist`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            missionId: currentMissionId,
            memberEmail: memberEmail,
          }),
          // body: JSON.stringify({
          //   missionId: 'yzn5LMDMCG',
          //   memberEmail: 'doacha@seesaw.com',
          // }),
        },
      )
      const data: MissionCompareList = await res.json()
      return data
    } catch (err) {
      console.log(err)
    }
  }

  const { isLoading: missionCompareListLoading, data: missionCompareList } =
    useQuery(['getMissionCompareList'], getMissionCompareList)
  return (
    <div className="w-full flex flex-col gap-5">
      <GraphCardText
        comment={`${
          categoryList[missionCompareList?.firstCategoryId ?? 0]
        } 에서 동료보다 많은 소비를 하셨어요. 새로운 미션을 시작해볼까요?`}
        textBefore="멤버들의 소비 패턴을&nbsp;"
        textAfter=" 확인해보세요."
        txtColor="text-surface"
      />
      <div className="flex flex-col gap-2">
        <CategorizedGraph
          category={missionCompareList?.firstCategoryId ?? 0}
          group={missionCompareList?.firstCategoryMissionAverage ?? 0}
          me={missionCompareList?.firstCategoryMemberAverage ?? 0}
          highlight="most"
        />
        <CategorizedGraph
          category={missionCompareList?.secondCategoryId ?? 0}
          group={missionCompareList?.secondCategoryMissionAverage ?? 0}
          me={missionCompareList?.secondCategoryMemberAverage ?? 0}
          highlight=""
        />
        <CategorizedGraph
          category={missionCompareList?.thirdCategoryId ?? 0}
          group={missionCompareList?.thirdCategoryMissionAverage ?? 0}
          me={missionCompareList?.thirdCategoryMemberAverage ?? 0}
          highlight=""
        />
        <CategorizedGraph
          category={missionCompareList?.frugalCategoryId ?? 0}
          group={missionCompareList?.frugalCategoryMissionAverage ?? 0}
          me={missionCompareList?.frugalCategoryMemberAverage ?? 0}
          highlight="least"
        />
      </div>
    </div>
  )
}

export default GroupGraphInfo
