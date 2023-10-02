import { ChangeEvent, SetStateAction } from 'react'
import Button from '@/app/components/Button'
import Input from '@/app/components/Input'
import { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import Capsule from '@/app/components/Capsule'
const SetSaveMoneyModal = ({
  setState,
  modalRef,
  setSavingMoney,
  savingMoney,
  missionCategory,
  changeModal,
  missionTargetPrice,
}: {
  setState: React.Dispatch<SetStateAction<number>>
  modalRef: React.RefObject<HTMLDialogElement>
  setSavingMoney: React.Dispatch<SetStateAction<number>>
  savingMoney: number
  missionCategory: string
  changeModal: (processLivel: number) => void
  missionTargetPrice: number
}) => {
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
        <div className="mb-5">
          미션 목표 금액은 {missionTargetPrice},
          <br />
          평소 {missionCategory} 소비 금액은 0000입니다
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
                <Capsule bgColor="background" textColor="black" isHasBorder>
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
                <Capsule bgColor="background" textColor="black" isHasBorder>
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
