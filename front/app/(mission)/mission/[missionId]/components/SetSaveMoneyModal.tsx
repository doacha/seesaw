import { ChangeEvent, SetStateAction } from 'react'
import Button from '@/app/components/Button'
import Input from '@/app/components/Input'
import { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import Capsule from '@/app/components/Capsule'
import { memberEmailStore } from '@/stores/memberEmail'
const SetSaveMoneyModal = ({
  setState,
  modalRef,
  setSavingMoney,
  savingMoney,
  missionCategory,
  changeModal,
  missionTargetPrice,
  spendMoney,
  period,
}: {
  setState: React.Dispatch<SetStateAction<number>>
  modalRef: React.RefObject<HTMLDialogElement>
  setSavingMoney: React.Dispatch<SetStateAction<number>>
  savingMoney: number
  missionCategory: string
  changeModal: (processLivel: number) => void
  missionTargetPrice: number
  spendMoney: number
  period: number
}) => {
  const { memberNickname } = memberEmailStore()
  const cancelButtonRef = useRef<HTMLButtonElement>(null)
  const handleSavingMoneyByButton = (unit: number, sign?: string) => {
    let money = unit
    if (sign === '-') {
      money *= -1
    }
    if (savingMoney + money <= 0) {
      setSavingMoney(0)
      return
    }
    setSavingMoney((prev) => prev + money)
  }
  const handleSavingMoney = (e: ChangeEvent<HTMLInputElement>) => {
    setSavingMoney(Number(e.target.value))
  }
  return (
    <dialog
      id="setSaveMoney"
      ref={modalRef}
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box bg-background">
        <div className="font-scDreamExBold mb-5">적금 금액 설정</div>
        <div className="mb-5 flex flex-col gap-y-1">
          <div>
            <span className="font-scDreamExBold mr-1">{memberNickname}</span>
            님의 {period}일 평균{' '}
            <span className="font-scDreamExBold">{missionCategory}</span> 소비
            금액:
          </div>
          <div className="text-center text-error text-[18px] bg-background-fill rounded-lg font-scDreamExBold my-2.5 py-2">
            {spendMoney.toLocaleString()} 원
          </div>
          <div>
            <span className="mb-2.5 font-scDreamExBold">미션 목표 금액</span>:
          </div>
          <div className="text-center text-primary text-[18px] bg-background-fill rounded-lg font-scDreamExBold my-2.5 py-2">
            {missionTargetPrice.toLocaleString()} 원
          </div>
          <span className="mt-5">
            참고하셔서 회차별 적금 금액을 설정해주세요!
          </span>
        </div>
        <Input
          placeholder=""
          interval="20"
          type="number"
          isLabelBig
          value={savingMoney}
          onChange={handleSavingMoney}
        />
        <div className="modal-action">
          <form method="dialog" className="w-full">
            {/* if there is a button in form, it  will close the modal */}
            <div className="grid grid-cols-2 gap-y-2.5 gap-x-5">
              <div className="flex flex-row justify-around items-center mb-5">
                <FontAwesomeIcon
                  icon={faPlus}
                  onClick={() => handleSavingMoneyByButton(1000)}
                  className="text-primary"
                />
                <Capsule
                  bgColor="background"
                  textColor="black"
                  isHasBorder
                  onClick={() => handleSavingMoneyByButton(1000)}
                >
                  1,000
                </Capsule>
                <FontAwesomeIcon
                  icon={faMinus}
                  onClick={() => handleSavingMoneyByButton(1000, '-')}
                  className="text-error"
                />
              </div>
              <div className="flex flex-row justify-around items-center mb-5">
                <FontAwesomeIcon
                  icon={faPlus}
                  onClick={() => handleSavingMoneyByButton(10000)}
                  className="text-primary"
                />
                <Capsule
                  bgColor="background"
                  textColor="black"
                  isHasBorder
                  onClick={() => handleSavingMoneyByButton(10000)}
                >
                  10,000
                </Capsule>
                <FontAwesomeIcon
                  icon={faMinus}
                  onClick={() => handleSavingMoneyByButton(10000, '-')}
                  className="text-error"
                />
              </div>
              <button
                // onClick={() => handleMonthClick(-2)}
                ref={cancelButtonRef}
                className="font-scDreamExBold text-[18px] text-gray leading-10 outline-transparent text-center"
              >
                취소
              </button>
              <Button
                color="primary"
                label="확인"
                onClick={() => {
                  changeModal(0)
                  cancelButtonRef.current?.click()
                }}
                size="lg"
                // disabled={selectedMonth === -1 ? true : false}
              />
            </div>
          </form>
        </div>
      </div>
    </dialog>
  )
}

export default SetSaveMoneyModal
