'use client'

import { useState } from 'react'
import Button from '@/app/components/Button'
import Input from './Input'
import SpendingCostInput from './SpendingCostInput'
import Swal from 'sweetalert2'
import DateInput from './DateInput'

// categoryToggle 수정 및 처리 필요
type Props = {
  open: boolean
  handleToggle: () => void
}

const AddPostModal = ({ open, handleToggle }: Props) => {
  let modalClass = 'modal sm:modal-middle'

  // open 속성이 true인 경우 'modal-open' 클래스를 추가합니다.
  if (open) {
    modalClass += ' modal-open'
  }

  const clickSave = () => {
    console.log(userInput)
    if (spendingCost === 0) {
      Swal.fire({
        width: 300,
        text: '금액을 입력해주세요!',
        icon: 'error',
      })
    } else if (spendingTitle === '') {
      Swal.fire({
        width: 300,
        text: '거래처를 입력해주세요!',
        icon: 'error',
      })
    }
  }
  // 요일을 2023년 9월 14일 목요일 오후 1:22로 변경해준다.
  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
    }

    const formatter = new Intl.DateTimeFormat('ko-KR', options)
    return formatter.format(date)
  }

  // 현재 날짜 데이터
  const formattedDate = formatDate(new Date())

  // api 응답 데이터로 바꿔야함
  const [userInput, setUserInput] = useState({
    spendingTitle: '',
    spendingCost: 0,
    spendingDate: formattedDate,
    spendingMemo: '',
    spendingCategoryId: 0,
    memberEmail: '',
  })

  const {
    spendingTitle,
    spendingCost,
    spendingDate,
    spendingMemo,
    spendingCategoryId,
    // 여기서 email은 redux에 저장된 이메일이겠죠?
    memberEmail,
  } = userInput

  const handleInput = (e: any) => {
    const { name, value } = e.target
    setUserInput({ ...userInput, [name]: value })
  }

  return (
    <div className={modalClass}>
      {/* we want any content for this modal layout so we just pass the children */}
      <div className="modal-box bg-white">
        <button
          className="btn btn-lg btn-circle btn-ghost absolute right-2 top-2"
          onClick={handleToggle}
        >
          ✕
        </button>

        <h3 className="font-bold text-lg font-scDreamRegular">거래처</h3>
        <div className="h-[1px] bg-outline rounded-full mt-2"></div>

        <div className="py-4">
          <SpendingCostInput value={spendingCost} onChange={handleInput} />
          {/* 카테고리 들어갈 곳 */}
          <div className="w-full flex flex-row gap-1 py-4 border-b-2 border-outline-container">
            <div className="w-28">
              <p className="font-scDreamExBold text-base">카테고리</p>
            </div>

            {/* <div className="flex my-auto w-full justify-between">
              <p className="font-scDreamLight text-base"></p>
              <div onClick={clickCategory} className="ml-1"></div>
            </div> */}
          </div>
          <Input
            title="거래처"
            type="text"
            name="spendingTitle"
            value={spendingTitle}
            onChange={handleInput}
            placeholder="거래처를 입력하세요"
          />

          {/* 날짜 입력 */}
          <DateInput value={spendingDate} onChange={handleInput} />

          <Input
            title="메모"
            type="text"
            name="spendingMemo"
            value={spendingMemo}
            onChange={handleInput}
            placeholder="메모를 입력하세요"
          />
        </div>
        <div className="mt-5">
          <Button color="primary" label="저장" size="sm" onClick={clickSave} />
        </div>
      </div>
    </div>
  )
}

export default AddPostModal
