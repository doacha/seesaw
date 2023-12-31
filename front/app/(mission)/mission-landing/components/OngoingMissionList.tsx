'use client'
import MissionCard from '../../components/MissionCard'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { categoryList } from '@/app/lib/constants'
import { isStarted } from '../../util'
import { memberEmailStore } from '@/stores/memberEmail'
interface MissionCardProps {
  missionId: string
  missionTitle: string
  missionMemberCount: number
  missionMaxCount: number
  missionImgUrl: string
  missionTargetPrice: number
  missionPeriod: number
  missionTotalCycle: number
  missionStartDate: string
  missionCategoryId: number
}

const getOngoingList = async ({
  page,
  memberEmail,
}: {
  page: number
  memberEmail: string
}) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/mission/mymission`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        page: page,
        memberEmail: memberEmail,
      }),
    },
  )
    .then((res) => {
      // console.log(res)
      return res.json()
    })
    .catch((err) => console.log('에러', err))
}

const OngoingMissionList = () => {
  const { memberEmail } = memberEmailStore()
  const { data, mutate } = useMutation(getOngoingList)
  useEffect(() => {
    mutate(
      { page: 0, memberEmail: memberEmail },
      {
        onError: (err) => console.log('내 미션 에러', err),
      },
    )
  }, [])

  return (
    <div className="">
      <div className="font-scDreamExBold mb-5 ">참여중인 미션</div>
      <div className="flex flex-wrap gap-5">
        {data && data.length > 0 ? (
          (data as MissionCardProps[])?.map((element, idx) => (
            <MissionCard
              data={element}
              key={idx}
              isStarted={isStarted(element.missionStartDate)}
              category={categoryList[element.missionCategoryId]}
            />
          ))
        ) : (
          <div className="bg-background flex items-center rounded-lg h-[150px] p-5 w-screen">
            <div className="text-center w-full">
              참여중인 미션이 없습니다. <br />
              새로운 미션에 참여해보세요!
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OngoingMissionList
