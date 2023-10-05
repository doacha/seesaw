'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFaceDizzy,
  faArrowRight,
  faCoins,
} from '@fortawesome/free-solid-svg-icons'
import ShieldGroup from './ShieldGroup'
import { useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { GroupStatusProps } from '@/app/types'
import { memberEmailStore } from '@/stores/memberEmail'

interface DepositStatus {
  missionMemberCnt: number
  missionFailMemberCnt: number
  changedDeposit: number
  failCnt: number
  myFailCnt: number
}

const NICKNAME_DUMMY = '도아차' // 로그인 연결 후 제거

const getDepositeStatus = async (input: {
  memberEmail: string
  missionId: string
}) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/mission/deposit-condition`,
    {
      method: 'POST',
      body: JSON.stringify({
        memberEmail: input.memberEmail,
        missionId: input.missionId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  ).then((res) => res.json())
}

const MyDepositStatusContainer = ({
  propsData,
}: {
  propsData: GroupStatusProps
}) => {
  const { memberNickname, memberEmail } = memberEmailStore()
  const { mutate, data, isSuccess } = useMutation(getDepositeStatus)
  console.log('aaaaaa', data)
  useEffect(() => {
    mutate(
      {
        memberEmail: memberEmail, // 더미 아이디, 추후 변경 필요
        missionId: propsData.missionId,
      },
      {
        onSuccess: (res) => {
          console.log('aaaa', res)
        },
        onError: (err) => console.log('으악', err),
      },
    )
  }, [])
  // if (isSuccess) {
  //   additionalPrize = propsData.missionTargetPrice + data.changedDeposit
  //   console.log('결과', additionalPrize, data)
  // }
  return (
    <div className="bg-background rounded-lg p-5 m-5">
      <div className="font-scDreamMedium">예치금 현황</div>
      <hr className="border-outline my-[7.5px]" />
      {/* 예치금 현황 */}
      <div className="rounded-lg bg-background-fill p-3 mt-4">
        <div className="text-outline text-xs mb-2.5">
          현재
          <span className="text-black text-sm ml-2">
            {data && (data as DepositStatus).missionFailMemberCnt}
          </span>
          명이 미션 실패했어요
        </div>
        <div className="rounded-lg bg-background p-5 flex items-end justify-around">
          <span className="flex gap-3">
            <FontAwesomeIcon
              icon={faFaceDizzy}
              className="text-error text-[40px] my-auto"
            />
            <span className="text-[38px] font-scDreamExBold text-outline">
              x
            </span>
            <span className="text-black text-[40px] font-black">
              {data?.missionFailMemberCnt ?? 0}
            </span>
          </span>
          <span>
            <FontAwesomeIcon
              icon={faArrowRight}
              className="text-outline text-[30px] mb-2 mr-5"
            />
            <FontAwesomeIcon
              icon={faCoins}
              className="text-primary text-[40px] mb-2"
            />
          </span>
        </div>
        {isSuccess && data.changedDeposit >= 0 && (
          <div className="mt-5 text-sm">
            <span>
              미션 예치금을
              <br />
              <span className="text-primary font-scDreamExBold text-base mr-1">
                {(
                  propsData.missionDeposit + data.changedDeposit
                ).toLocaleString('ko-KR')}
              </span>
              원 받을 수 있어요!
            </span>
          </div>
        )}
        {isSuccess && data.changedDeposit < 0 && (
          <div className="py-5 p text-sm">
            <span>
              미션 예치금을
              <br />
              <span className="text-error text-[18px] font-scDreamExBold mr-1">
                {(
                  propsData.missionDeposit + data.changedDeposit
                ).toLocaleString()}
              </span>
              원 받습니다...
            </span>
          </div>
        )}
      </div>
      {/* 내 실패 현황 */}
      <div className="rounded-lg bg-background-fill p-3 my-5">
        <div className="text-xs">
          <span className="text-sm font-scDreamMedium mr-1">
            {memberNickname}
          </span>
          님의 실패 현황
        </div>
        <div>
          <ShieldGroup
            failureCount={data?.failCnt ?? 0}
            myFailureCount={data?.myFailCnt ?? 0}
          />
        </div>
        <div className="font-scDreamExBold text-right text-[20px]">
          <span className="text-error">{data?.myFailCnt ?? 0}</span>
          <span> / {data?.failCnt ?? 0}</span>
        </div>
      </div>
    </div>
  )
}

export default MyDepositStatusContainer
