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

import DateInput from './DateInput'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

type Props = {
  open: boolean
  handleToggle: () => void
}

const AddPostModal = ({ open, handleToggle }: Props) => {
  const { memberEmail, setMemberEmail } = memberEmailStore()
  let modalClass = 'modal sm:modal-middle'

  // open 속성이 true인 경우 'modal-open' 클래스를 추가합니다.
  if (open) {
    modalClass += ' modal-open'
  }

  // Todo.. 날짜 해결필요
  const today = new Date()
  console.log(today.toUTCString())
  const [postInput, setPostInput] = useState({
    spendingTitle: '',
    spendingCost: 0,
    spendingDate: today,
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

  // 왜 여기선 data를 Date 자료형으로 보내야 하는거지? 어휴 이씨 짜증나네
  const data: {
    spendingTitle: string
    spendingCost: number
    spendingDate: Date
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

  const handleInput = (e: any) => {
    const { name, value } = e.target
    // 0으로 시작못하게 처리
    let newValue = value
    if (name === 'spendingCost' && /^0/.test(value)) {
      newValue = value.substring(1)
    }
    setPostInput({ ...postInput, [name]: newValue })
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
          console.log(spendingDate)
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

          {/* 카테고리 들어갈 곳 */}
          <div className={`overflow-auto ${styles.delScroll}`}>
            <CategoryInput
              selectedCategoryId={spendingCategoryId}
              handleCategoryClick={handleCategoryClick}
            />
          </div>

          {/* <div className={`overflow-auto ${styles.delScroll}`}>
            <div className="w-full flex flex-row gap-1 py-4 border-b-2 border-outline-container">
              <div className=" w-20 my-auto">
                <div className="w-20">
                  <p className="font-scDreamExBold text-base">카테고리</p>
                </div>
              </div>
              <div className="flex my-auto w-full justify-between">
                <div className="carousel">
                  {categoryList.map(
                    (element, idx) =>
                      idx > 0 && (
                        <ToggleCapsule
                          className="carousel-item mr-[15px] h-[14px]"
                          bgColor="background-fill"
                          textColor={`${idx}`}
                          key={idx}
                          isSelected={idx === spendingCategoryId}
                          onClick={() =>
                            handleCapsuleClick(
                              idx,
                              idx === spendingCategoryId,
                              'spendingCategoryId',
                            )
                          }
                        >
                          {element}
                        </ToggleCapsule>
                      ),
                  )}
                </div>
              </div>
            </div>
          </div> */}

          <Input
            title="거래처"
            type="text"
            name="spendingTitle"
            value={spendingTitle}
            onChange={handleInput}
            placeholder="거래처를 입력하세요"
          />

          {/* 날짜 입력 */}
          {/* <DateInput value={spendingDate} onChange={handleInput} /> */}
          {/* 하.. 날짜가 사람을 힘들게 하네.. */}
          <div className="w-full flex flex-row gap-1 py-4 border-b-2 border-outline-container">
            <div className="w-28">
              <p className="font-scDreamExBold text-base">날짜</p>
            </div>
            <div className="flex my-auto w-full justify-between">
              {!clickDa ? (
                <p className="my-auto font-scDreamLight text-xs">
                  {formatDate(spendingDate)}
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
