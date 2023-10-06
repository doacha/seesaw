'use client'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import Button from '@/app/components/Button'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

import { Spending } from '@/app/types'
import styles from '../styles/Home.module.css'

import { memberEmailStore } from '@/stores/memberEmail'

import SpendingCostInput from './SpendingCostInput'
import CategoryInput from './CategoryInput'
import Input from './Input'
import TextAreaInput from './TextAreaInput'

import { UpdateDeleteCheckStore } from '@/stores/updateDeleteCheck'

type Props = {
  open: boolean
  handleToggle: () => void
  selectedSpendingId: number
}

const DetailModal = ({ open, handleToggle, selectedSpendingId }: Props) => {
  const { checkUpdateDelete, setCheckUpdateDelete } = UpdateDeleteCheckStore()
  const { memberEmail, setMember } = memberEmailStore()

  const [spend, setSpend] = useState<Spending>({
    spendingTitle: '',
    spendingCost: 0,
    spendingDate: '',
    spendingCategoryId: -1,
    memberEmail: memberEmail,
  })
  const [clickDa, setClickDa] = useState(false)
  const clickDate = () => {
    setClickDa(!clickDa)
  }

  const fetchDetailSpending = (selectedSpendingId: number) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/spending/${selectedSpendingId}`,
      {
        method: 'GET',
      },
    )
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setSpend(data)
      })
  }

  useEffect(() => {
    fetchDetailSpending(selectedSpendingId)
  }, [selectedSpendingId])

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
    setSpend({ ...spend, [name]: newValue })
  }

  const fetchDelete = (selectedSpendingId: number) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/spending/delete/${selectedSpendingId}`,
      {
        method: 'DELETE',
      },
    ).then((res) => {
      if (res.status === 200) {
        Swal.fire({
          title: '삭제 성공',
          width: 300,
          icon: 'success',
        })
        setCheckUpdateDelete(true)
      } else if (res.status === 403) {
        Swal.fire({
          title: '삭제 실패',
          width: 300,
          icon: 'error',
          html: '미션에 참가중인 <br> 지출 내역입니다.',
        })
      }
      handleToggle()
    })
  }
  // 이건 삭제
  const clickDetele = () => {
    fetchDelete(selectedSpendingId)
  }
  const data: {
    spendingId: number
    spendingTitle: string
    spendingCost: number
    spendingDate: string
    spendingMemo: string
    spendingCategoryId: number
    memberEmail: string
  } = {
    spendingId: selectedSpendingId,
    spendingTitle: spend.spendingTitle as string,
    spendingCost: spend.spendingCost as number,
    spendingDate: new Date(spend.spendingDate as string).toUTCString(),
    spendingMemo: spend.spendingMemo as string,
    spendingCategoryId: spend.spendingCategoryId as number,
    memberEmail: memberEmail,
  }
  const fetchUpdate = (data: object) => {
    fetch(`${process.env.NEXT_PUBLIC_SEESAW_API_URL}/spending/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            title: '수정 성공',
            width: 300,
            icon: 'success',
          })
          // Todo. setCheckUpdateDelete의 위치는?
          setCheckUpdateDelete(true)
        } else if (res.status === 403) {
          Swal.fire({
            title: '수정 실패',
            width: 300,
            icon: 'error',
            html: '미션에 참가중인 <br> 지출 내역입니다.',
          })
        }
        return res.json()
      })
      .then((data) => {
        // 모달창 닫기
        handleToggle()
        setSpend({
          spendingTitle: '',
          spendingCost: 0,
          spendingDate: '',
          spendingMemo: '',
          spendingCategoryId: -1,
          memberEmail: memberEmail,
        })
      })
  }
  const clickSave = () => {
    if (
      spend.spendingCost === 0 ||
      spend.spendingCost?.toString() === '' ||
      Number.isNaN(spend.spendingCost)
    ) {
      Swal.fire({
        width: 300,
        text: '금액을 입력해주세요!',
        icon: 'error',
      })
    } else if (spend.spendingTitle === '') {
      Swal.fire({
        width: 300,
        text: '거래처를 입력해주세요!',
        icon: 'error',
      })
    } else {
      fetchUpdate(data)
    }
  }

  let modalClass = 'modal sm:modal-middle'

  // open 속성이 true인 경우 'modal-open' 클래스를 추가합니다.
  if (open) {
    modalClass += ' modal-open'
  }

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

  const handleCategoryClick = (idx: number) => {
    setSpend({ ...spend, spendingCategoryId: idx })
  }

  return (
    <div className={modalClass}>
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
          <div>
            <>
              <SpendingCostInput
                value={spend?.spendingCost as number}
                onChange={handleInput}
              />

              {/* 카테고리 들어갈 곳 */}
              <div className={`overflow-auto ${styles.delScroll}`}>
                <CategoryInput
                  selectedCategoryId={spend.spendingCategoryId as number}
                  handleCategoryClick={handleCategoryClick}
                />
              </div>

              <Input
                title="거래처"
                type="text"
                name="spendingTitle"
                value={spend?.spendingTitle as string}
                onChange={handleInput}
              />

              <div className="w-full flex flex-row gap-1 py-4 border-b-2 border-outline-container">
                <div className="w-28">
                  <p className="font-scDreamExBold text-base">날짜</p>
                </div>
                <div className="flex my-auto w-full justify-between">
                  {!clickDa ? (
                    <p className="my-auto font-scDreamLight text-xs">
                      {spend.spendingDate &&
                        formatDate(new Date(spend.spendingDate as string))}
                    </p>
                  ) : (
                    <input
                      className="w-full mr-5 font-scDreamLight text-xs"
                      type="datetime-local"
                      name="spendingDate"
                      onChange={handleInput}
                    />
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
                value={spend?.spendingMemo as string}
                onChange={handleInput}
              />
            </>
          </div>
        </div>
        <div className="flex mt-6 justify-between">
          <div className="w-full grid grid-cols-3 gap-2">
            {/* closes the modal */}
            <div className="col-span-1">
              <Button
                color="error"
                label="삭제"
                size="sm"
                onClick={clickDetele}
              />
            </div>
            <div className="col-span-2">
              <Button
                color="primary"
                label="저장"
                size="sm"
                onClick={clickSave}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailModal
