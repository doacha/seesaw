'use client'

import Button from '@/app/components/Button'
import { DialogHTMLAttributes, useState, useRef } from 'react'
import SetSaveMoneyModal from './SetSaveMoneyModal'
import ConfirmDepositModal from './ConfirmDepositModal'
import MoneyTransferModal from './MoneyTransferModal'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { memberEmailStore } from '@/stores/memberEmail'
import { useRouter } from 'next/navigation'

const dummyCategorySaveMoney = 10000
const MissionJoinButton = ({
  isSaveMission,
  missionCategory,
  missionTargetPrice,
  missionCategoryId,
  missionPeriod,
  missionId,
  refetch,
  missionDeposit,
  missionTotalCycle,
}: {
  isSaveMission: boolean
  missionCategory: string
  missionTargetPrice: number
  missionCategoryId: number
  missionPeriod: number
  missionId: string
  refetch: any
  missionDeposit: number
  missionTotalCycle: number
}) => {
  const [processLevel, setProcessLevel] = useState(isSaveMission ? 0 : 1)
  const [savingMoney, setSavingMoney] = useState(dummyCategorySaveMoney)
  const [password, setPassword] = useState<string[]>(['', '', '', ''])
  const { mutate: depositMoney } = useMutation(postDepositMoney)
  const { mutate: joinMission } = useMutation(putJoinMission)
  const { memberEmail } = memberEmailStore()
  const { mutate, data } = useMutation(getCategorySpendMoney)
  const refList = [
    useRef<HTMLDialogElement>(null),
    useRef<HTMLDialogElement>(null),
    useRef<HTMLDialogElement>(null),
  ]
  const router = useRouter()

  // 카테고리별 소비금액, 적금금액 초기값
  useEffect(() => {
    mutate(
      {
        categoryId: missionCategoryId,
        memberEmail: memberEmail,
      },
      {
        onSuccess: (res) => {
          const spendMoney = convertMonthlyToUserSet(res.average, missionPeriod)
          setSavingMoney(
            deleteChange(
              spendMoney - missionTargetPrice > 0
                ? spendMoney - missionTargetPrice
                : 0,
            ),
          )
        },
      },
    )
  }, [])

  // 참여하기 최종버튼 통과
  const handleJoinButton = (processLevel: number) => {
    if (processLevel === 2) {
      const depositeRequest = {
        // accountTransactionNum: `${process.env.NEXT_PUBLIC_SEESAWBANK_ACCOUNT_NUM}`,
        accountApprovalAmount: missionDeposit,
        accountPassword: password.join(''),
        memberEmail: memberEmail,
        // accountNum: DUMMY_ACCOUNT_NUM,
      }

      depositMoney(depositeRequest, {
        onSuccess: (res) => {
          console.log(res.status)
          if (res.status === 500 || res.status === 'BAD_REQUEST') {
            console.log('에치금입금실패')
            return
          }
          joinMission(
            {
              missionId,
              memberEmail,
              memberMissionSavingMoney: savingMoney,
            },
            {
              onSuccess: (res) => router.push('/mission-landing'),
              onError: (err) => console.log('미션 참가 에러', err),
            },
          )
        },
        onError: (err) => console.log('예치금입금실패', err),
      })
      return
    }
    refList[processLevel + 1].current?.showModal()
  }

  return (
    <div>
      <div className="fixed bottom-[90px] left-[50%] translate-x-[-50%] w-screen px-5">
        <Button
          color="primary"
          label="미션 참여하기"
          onClick={() => handleJoinButton(processLevel - 1)}
        />
      </div>
      {/* {modalList[processLevel]} */}
      <SetSaveMoneyModal
        setState={setProcessLevel}
        modalRef={refList[0]}
        setSavingMoney={setSavingMoney}
        savingMoney={savingMoney}
        missionCategory={missionCategory}
        changeModal={handleJoinButton}
        missionTargetPrice={missionTargetPrice}
        period={missionPeriod}
        spendMoney={Math.trunc(data?.average ?? 0)}
      />
      <ConfirmDepositModal
        changeModal={handleJoinButton}
        modalRef={refList[1]}
        missionTargetPrice={missionDeposit}
        missionTotalCycle={missionTotalCycle}
      />
      <MoneyTransferModal
        changeModal={handleJoinButton}
        modalRef={refList[2]}
        password={password}
        setPassword={setPassword}
        missionTargetPrice={missionTargetPrice}
      />
    </div>
  )
}

const getCategorySpendMoney = async ({
  categoryId,
  memberEmail,
}: {
  categoryId: number
  memberEmail: string
}) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/mission/monthaverage`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        categoryId,
        memberEmail,
      }),
    },
  ).then((res) => res.json())
}

interface DepositRequest {
  accountApprovalAmount: number
  accountPassword: string
  memberEmail: string
  [key: string]: any
}

const postDepositMoney = async (depositRequset: DepositRequest) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/member/balance-transfer`,
    {
      method: 'POST',
      body: JSON.stringify(depositRequset),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  ).then((res) => {
    let js = res.json()
    console.log('입금 결과', js)
    return js
  })
}

const putJoinMission = async ({
  missionId,
  memberEmail,
  memberMissionSavingMoney,
}: {
  missionId: string
  memberEmail: string
  memberMissionSavingMoney: number
}) => {
  return await fetch(`${process.env.NEXT_PUBLIC_SEESAW_API_URL}/mission`, {
    method: 'PUT',
    body: JSON.stringify({
      missionId,
      memberEmail,
      memberMissionSavingMoney,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    // let js = res.json()
    console.log('입금 결과', res)
    return res
  })
}

const convertMonthlyToUserSet = (
  spendMoney: number | undefined,
  period: number,
) => {
  if (spendMoney === undefined) return 0
  return Math.trunc((spendMoney / 30) * period)
}

// 1000원단위로 바꿔주기
const deleteChange = (money: number) => {
  if (money === 0) return 0
  let temp = Math.ceil(money / 1000) * 1000
  return temp
}
export default MissionJoinButton
