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
  missionTargetPrice,
}: {
  isSaveMission: boolean
  missionCategory: string
  missionTargetPrice: number
}) => {
  const [processLevel, setProcessLevel] = useState(isSaveMission ? 0 : 1)
  const [savingMoney, setSavingMoney] = useState(dummyCategorySaveMoney)
  const [password, setPassword] = useState<string[]>(['', '', '', ''])
  const refList = [
    useRef<HTMLDialogElement>(null),
    useRef<HTMLDialogElement>(null),
    useRef<HTMLDialogElement>(null),
  ]
  const handleJoinButton = (processLevel: number) => {
    if (processLevel === 2) {
      return
    }
    refList[processLevel + 1].current?.showModal()
  }
  // const modalList = [
  //   <SetSaveMoneyModal
  //   setState={setProcessLevel}
  //   modalRef={refList[0]}
  //   setSavingMoney={setSavingMoney}
  //   savingMoney={savingMoney}
  //   missionCategory={missionCategory}
  //   changeModal={handleJoinButton}
  //   missionTargetPrice={data.missionTargetPrice}
  // />,
  //   <ConfirmDepositModal
  //     changeModal={handleJoinButton}
  //     modalRef={refList[1]}
  //   />,
  //   <MoneyTransferModal changeModal={handleJoinButton} modalRef={refList[2]} password={password} setPassword={setPassword}/>,
  // ]
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
      />
      <ConfirmDepositModal
        changeModal={handleJoinButton}
        modalRef={refList[1]}
      />
      <MoneyTransferModal
        changeModal={handleJoinButton}
        modalRef={refList[2]}
        password={password}
        setPassword={setPassword}
      />
    </div>
  )
}

export default MissionJoinButton
