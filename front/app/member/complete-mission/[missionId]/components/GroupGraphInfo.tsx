import { categoryIcon, categoryList } from '@/app/lib/constants'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import CategorizedGraph from './CategorizedGraph'
import GraphCardText from './GraphCardText'
import { member } from '@/app/dummies'

const statisticList: Array<{ category: number; group: number; me: number }> = [
  { category: 7, group: 10, me: 15 },
  { category: 10, group: 7, me: 8 },
  { category: 3, group: 6, me: 4 },
  { category: 8, group: 12, me: 7 },
  { category: 5, group: 4, me: 8 },
]

const GroupGraphInfo = () => {
  return (
    <div className="w-full flex flex-col gap-5">
      <GraphCardText
        comment={`${member.memberNickname}님은 ${
          categoryList[statisticList[0].category]
        } 에서 동료보다 많은 소비를 하셨어요. 새로운 미션을 시작해볼까요?`}
        textBefore="멤버들은 이런 곳에 "
        textAfter="돈을 쓰고 있어요."
        txtColor="text-surface"
      />
      <div className="flex flex-col gap-2">
        {statisticList.map((statistic, index) => (
          <CategorizedGraph
            category={statistic.category}
            group={statistic.group}
            me={statistic.me}
            highlight={
              index === 0
                ? 'most'
                : index === statisticList.length - 1
                ? 'least'
                : ''
            }
            key={index}
          />
        ))}
      </div>
    </div>
  )
}

export default GroupGraphInfo
