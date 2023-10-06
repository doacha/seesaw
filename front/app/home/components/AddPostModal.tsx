'use client'

import { useState } from 'react'
import Button from '@/app/components/Button'
import SpendingCostInput from './SpendingCostInput'
import Swal from 'sweetalert2'

import styles from '../styles/Home.module.css'
import Input from './Input'
import TextAreaInput from './TextAreaInput'
import CategoryInput from './CategoryInput'

import { memberEmailStore } from '@/stores/memberEmail'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

type Props = {
  open: boolean
  handleToggle: () => void
}

const AddPostModal = ({ open, handleToggle }: Props) => {
  const { memberEmail } = memberEmailStore()
  let modalClass = 'modal sm:modal-middle'

  // open 속성이 true인 경우 'modal-open' 클래스를 추가합니다.
  if (open) {
    modalClass += ' modal-open'
  }

  // Todo.. 날짜 해결필요
  const today = new Date()

  const handleInput = (e: any) => {
    const { name, value } = e.target
    // 0으로 시작못하게 처리
    let newValue = value
    if (name === 'spendingCost' && /^0/.test(value)) {
      newValue = value.substring(1)
    }
    // 소수점 입력 불가
    if (name === 'spendingCost') {
      newValue = parseInt(value, 10)
    }
    if (name === 'spendingDate') {
      newValue = new Date(value)
    }
    setPostInput({ ...postInput, [name]: newValue })
  }

  const [postInput, setPostInput] = useState({
    spendingTitle: '',
    spendingCost: 0,
    spendingDate: today.toUTCString(),
    spendingMemo: '',
    spendingCategoryId: 20,
    memberEmail: memberEmail,
  })

  const {
    spendingTitle,
    spendingCost,
    spendingDate,
    spendingMemo,
    spendingCategoryId,
  } = postInput

  const data: {
    spendingTitle: string
    spendingCost: number
    spendingDate: string
    spendingMemo: string
    spendingCategoryId: number
    memberEmail: string
  } = {
    spendingTitle: spendingTitle,
    spendingCost: spendingCost,
    spendingDate: spendingDate,
    spendingMemo: spendingMemo,
    spendingCategoryId: spendingCategoryId,
    memberEmail: memberEmail,
  }
  // 새로운 소비내역등록
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
          spendingDate: today.toUTCString(),
          spendingMemo: '',
          spendingCategoryId: 20,
          memberEmail: memberEmail,
        })
      })
  }

  // 저장버튼 클릭
  const clickSave = () => {
    if (data.spendingCost === 0 || data.spendingCost?.toString() === '') {
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

  // date 관련
  const [clickDa, setClickDa] = useState(false)
  const clickDate = () => {
    setClickDa(!clickDa)
  }

  const handleCategoryClick = (idx: number) => {
    setPostInput({ ...postInput, spendingCategoryId: idx })
  }
  // 뭐가 꼬인거지?
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

          <div className={`overflow-auto ${styles.delScroll}`}>
            <CategoryInput
              selectedCategoryId={spendingCategoryId}
              handleCategoryClick={handleCategoryClick}
            />
          </div>

          <Input
            title="거래처"
            type="text"
            name="spendingTitle"
            value={spendingTitle}
            onChange={handleInput}
            placeholder="거래처를 입력하세요"
          />

          <div className="w-full flex flex-row gap-1 py-4 border-b-2 border-outline-container">
            <div className="w-28">
              <p className="font-scDreamExBold text-base">날짜</p>
            </div>
            <div className="flex my-auto w-full justify-between">
              {!clickDa ? (
                <p className="my-auto font-scDreamLight text-xs">
                  {formatDate(new Date(spendingDate))}
                </p>
              ) : (
                <input
                  className="w-full mr-5 font-scDreamLight text-xs"
                  type="datetime-local"
                  name="spendingDate"
                  onChange={handleInput}
                ></input>
              )}
              <div onClick={clickDate} className="ml-1">
                {!clickDa ? (
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    style={{ color: '#001b2a' }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    style={{ color: '#001b2a' }}
                    rotation={90}
                  />
                )}
              </div>
            </div>
          </div>

          <TextAreaInput
            title="메모"
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
