'use client'

import { ChangeEvent, SetStateAction } from 'react'
import Button from '@/app/components/Button'
import Input from '@/app/components/Input'
import { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons'
import Capsule from '@/app/components/Capsule'

const ConfirmDepositModal = ({
  modalRef,
  changeModal,
  missionTargetPrice,
}: {
  modalRef: React.RefObject<HTMLDialogElement>
  changeModal: (processLivel: number) => void
  missionTargetPrice: number
}) => {
  const cancelButtonRef = useRef<HTMLButtonElement>(null)
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
              changeModal(-1)
            }}
            className="mr-2.5"
          />
          미션 참가 확인
        </div>
        <div className="mb-5 flex flex-col gap-y-5">
          <div>
            <span className="font-scDreamExBold">n회 미만</span>{' '}
            <span className="font-scDreamExBold text-error">미션 실패</span>할
            경우 환급금이 증가하고,
            <div className="mt-2 py-2 text-center bg-background-fill rounded-lg">
              예치금 + 상금 <FontAwesomeIcon icon={faChevronRight} /> 환급금{' '}
              <span className="text-primary">증가</span>
            </div>
          </div>
          <div>
            <span className="font-scDreamExBold">n회 이상</span>{' '}
            <span className="font-scDreamExBold text-error">미션 실패</span>할
            경우 환급금이 감소해요.
            <div className="mt-2 py-2 text-center bg-background-fill rounded-lg">
              예치금 - 벌금 <FontAwesomeIcon icon={faChevronRight} /> 환급금{' '}
              <span className="text-error">감소</span>
            </div>
          </div>
          <div className="text-center text-[20px] my-5">
            예치금 {missionTargetPrice}원 입금하여 <br />
            미션에 참가하시겠어요?
          </div>
        </div>
        <div className="modal-action">
          <form method="dialog" className="w-full">
            {/* if there is a button in form, it  will close the modal */}
            <div className="">
              <button
                // onClick={() => handleMonthClick(-2)}
                ref={cancelButtonRef}
                className="font-scDreamExBold text-[18px] h-[40px]  w-full min-h-[40px] min-h-10 mb-2.5 btn btn-outline text-gray outline-transparent "
              >
                안할래요
              </button>
              <Button
                color="primary"
                label="예치금 입금하고 참가하기"
                onClick={() => changeModal(1)}
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

export default ConfirmDepositModal
