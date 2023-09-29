'use client'

import Button from '@/app/components/Button'
import { DialogHTMLAttributes, useState, useRef } from 'react'
import SetSaveMoneyModal from './SetSaveMoneyModal'
import ConfirmDepositModal from './ConfirmDepositModal'
import MoneyTransferModal from './MoneyTransferModal'
import { mission } from '@/app/dummies'

const dummyCategorySaveMoney = 10000
const MissionJoinButton = ({
  isSaveMission,
  missionCategory,
}: {
  isSaveMission: boolean
  missionCategory: string
}) => {
  const [processLevel, setProcessLevel] = useState(isSaveMission ? 0 : 1)
  const [savingMoney, setSavingMoney] = useState(dummyCategorySaveMoney)
  const [refModal1, refModal2, refModal3] = [
    useRef<HTMLDialogElement>(null),
    useRef<HTMLDialogElement>(null),
    useRef<HTMLDialogElement>(null),
  ]
  const handleJoinButton = () => {
    refModal1.current?.showModal()
  }
  // 버튼 누르면
  // 적금 미션이면 적금 금액 세팅
  // 세팅 끝나고 나서 n회 실패부터 반환되는 예치금이 줄어듭니다. 예치금 입금 및 미션 참가하 하시겠습니까?
  // 계좌이체 절차
  //

  return (
    <div>
      <div className="fixed bottom-[90px] left-[50%] translate-x-[-50%] w-screen px-5">
        <Button
          color="primary"
          label="미션 참여하기"
          onClick={handleJoinButton}
        />
      </div>
      {/* {modalList[processLevel]} */}
      <SetSaveMoneyModal
        setState={setProcessLevel}
        modalRef={refModal1}
        setSavingMoney={setSavingMoney}
        savingMoney={savingMoney}
        missionCategory={missionCategory}
        nextModal={refModal2}
      />
      <ConfirmDepositModal />
      <MoneyTransferModal />
    </div>
  )
}

export default MissionJoinButton
