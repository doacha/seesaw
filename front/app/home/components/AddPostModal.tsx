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

  const today = new Date()

  const [postInput, setPostInput] = useState({
    spendingTitle: '',
    spendingCost: 0,
    spendingDate: today,
    spendingMemo: '',
    spendingCategory: '2',
    memberEmail: 'doacha@seesaw.com',
  })

  const {
    spendingTitle,
    spendingCost,
    spendingDate,
    spendingMemo,
    spendingCategory,
    // 여기서 email은 zustend 저장된 이메일이겠죠?
    memberEmail,
  } = postInput

  // 백엔드로 보내기 위한 date 설정
  const stringToDate = spendingDate.toISOString()

  const data: {
    spendingTitle: string
    spendingCost: number
    spendingDate: string
    spendingMemo: string
    spendingCategory: string
    memberEmail: string
  } = {
    spendingTitle: spendingTitle,
    spendingCost: spendingCost,
    spendingDate: stringToDate,
    spendingMemo: spendingMemo,
    spendingCategory: '2',
    memberEmail: 'doacha@seesaw.com',
  }

  const handleInput = (e: any) => {
    const { name, value } = e.target
    setPostInput({ ...postInput, [name]: value })
  }

  const fetchAddPost = (data: object) => {
    fetch(`${process.env.NEXT_PUBLIC_SEESAW_API_URL}/spending`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // JSON 데이터를 전송할 경우 지정
      },
      body: JSON.stringify(data), // 데이터를 JSON 문자열로 변환하여 전송
    })
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            title: '등록완료 성공',
            width: 300,
            icon: 'success',
          })
        }
        return res.json()
      })
      .then((data) => {
        // 모달창 닫기
        handleToggle()
        setPostInput({
          spendingTitle: '',
          spendingCost: 0,
          spendingDate: today,
          spendingMemo: '',
          // 여기 수정이 필요합니다.
          spendingCategory: '2',
          memberEmail: 'doacha@seesaw.com',
        })
        console.log(data)
      })
  }
  const clickSave = () => {
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
    } else {
      fetchAddPost(data)
    }
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

        <form id="addPostForm" className="py-4">
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
        </form>
        <div className="mt-5">
          <Button color="primary" label="저장" size="sm" onClick={clickSave} />
        </div>
      </div>
    </div>
  )
}

export default AddPostModal
