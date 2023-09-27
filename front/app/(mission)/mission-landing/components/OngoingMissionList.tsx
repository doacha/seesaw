'use client'

import type { MissionList } from '@/app/types'
import MissionCard from '../../components/MissionCard'
import { useQuery } from '@tanstack/react-query'

const getOngoingList = async () => {
  return await fetch(`${process.env.NEXT_PUBLIC_SEESAW_API_URL}/mission`).then(
    (res) => {
      console.log(res)
      return res.json()
    },
  )
}

const OngoingMissionList = () => {
  const { data } = useQuery<MissionList[]>({
    queryKey: ['mission-card'],
    queryFn: () => getOngoingList(),
    suspense: true,
    staleTime: 5 * 1000,
  })

  return (
    <div className="">
      <div className="font-scDreamExBold mb-5 ">참여중인 미션</div>
      <div className="flex flex-wrap gap-5">
        {data &&
          data.map((element, idx) => <MissionCard data={element} key={idx} />)}
      </div>
    </div>
  )
}

export default OngoingMissionList
