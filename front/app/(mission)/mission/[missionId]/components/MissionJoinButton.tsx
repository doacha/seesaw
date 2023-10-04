'use client'

import Button from '@/app/components/Button'
import { DialogHTMLAttributes, useState, useRef } from 'react'
import SetSaveMoneyModal from './SetSaveMoneyModal'
import ConfirmDepositModal from './ConfirmDepositModal'
import MoneyTransferModal from './MoneyTransferModal'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { memberEmailStore } from '@/stores/memberEmail'

const dummyCategorySaveMoney = 10000
const MissionJoinButton = ({
  isSaveMission,
  missionCategory,
  missionTargetPrice,
  missionCategoryId,
  missionPeriod,
}: {
  isSaveMission: boolean
  missionCategory: string
  missionTargetPrice: number
  missionCategoryId: number
  missionPeriod: number
}) => {
  const [processLevel, setProcessLevel] = useState(isSaveMission ? 0 : 1)
  const [savingMoney, setSavingMoney] = useState(dummyCategorySaveMoney)
  const [password, setPassword] = useState<string[]>(['', '', '', ''])
  const { memberEmail } = memberEmailStore()
  const { mutate, data } = useMutation(getCategorySpendMoney)
  const refList = [
    useRef<HTMLDialogElement>(null),
    useRef<HTMLDialogElement>(null),
    useRef<HTMLDialogElement>(null),
  ]
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
  const handleJoinButton = (processLevel: number) => {
    if (processLevel === 2) {
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
        missionTargetPrice={missionTargetPrice}
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
  const { mutate: categorySpendMoney, data: spendMoney } = useMutation(
    getCategorySpendMoney,
  )
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
