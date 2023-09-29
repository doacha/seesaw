'use client'

import { ChangeEvent, SetStateAction } from 'react'
import Button from '@/app/components/Button'
import Input from '@/app/components/Input'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Capsule from '@/app/components/Capsule'
import { useRef } from 'react'
const MoneyTransferModal = ({
  modalRef,
  changeModal,
}: {
  modalRef: React.RefObject<HTMLDialogElement>
  changeModal: (processLivel: number) => void
}) => {
  const cancelButtonRef = useRef<HTMLButtonElement>(null)
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]
  const [password, setPassword] = useState<string[]>(['', '', '', ''])
  const inputKeyboardList = Array(10)
  const onInputFilled = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.target.value !== '' && index < inputRefs.length - 1) {
      inputRefs[index + 1]?.current?.focus()
    }
  }
  const handlePassword = (
    event: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newPassword = password.slice()
    newPassword[index] = event.target.value
    setPassword(newPassword)
  }
  return (
    <dialog
      id="setSaveMoney"
      ref={modalRef}
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box bg-background">
        <div className="font-scDreamExBold mb-5">
          <FontAwesomeIcon
            icon={faChevronLeft}
            onClick={() => {
              cancelButtonRef.current?.click()
              changeModal(0)
            }}
            className="mr-2.5"
          />
          예치금 입금
        </div>
        <div className="mb-5 flex flex-col gap-y-2.5">
          <div className="flex flex-row justify-between text-outline mb-5">
            <div>내 대표계좌</div>
            <FontAwesomeIcon icon={faArrowRight} />
            <div>시소 마스터</div>
          </div>
          <div className="bg-background-fill rounded-lg leading-[80px] h-[80px] font-scDreamExBold text-center text-[30px] mb-5">
            30,000
            <span className="font-scDreamMedium text-[26px] ml-2">원</span>
          </div>
          <div className="text-center mb-5">계좌 비밀번호를 입력해주세요.</div>
          <div className="flex flex-row justify-around">
            {password.map((digit, index) => (
              <input
                key={index}
                type="password"
                value={digit}
                maxLength={1}
                ref={inputRefs[index]}
                onChange={(e) => {
                  handlePassword(e, index)
                  onInputFilled(e, index)
                }}
                className="input w-[64px]  bg-background-fill input-lg font-scDreamExBold focus:outline-primary focus:outline-[3px] "
              />
            ))}
          </div>
        </div>
        <div className="modal-action">
          <form method="dialog" className="w-full">
            {/* if there is a button in form, it  will close the modal */}
            <div className="grid grid-cols-2 gap-5">
              <button
                ref={cancelButtonRef}
                className="font-scDreamExBold text-lg w-full h-10 mb-2.5 btn btn-sm btn-outline text-gray outline-transparent "
              >
                취소
              </button>
              <Button
                color="primary"
                label="확인"
                onClick={() => changeModal(2)}
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

export default MoneyTransferModal
