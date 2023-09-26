'use client'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import Button from '@/app/components/Button'

import SpendingCostInput from './SpendingCostInput'
import Input from './Input'
import DateInput from './DateInput'

import { Spending } from '@/app/types'

import { spend } from '@/app/dummies'

type Props = {
  open: boolean
  handleToggle: () => void
  selectedSpendingId: number
}

// 백엔드 통신을 통한 데이터를 가져와서 바꿔줘야 함

const DetailModal = ({ open, handleToggle, selectedSpendingId }: Props) => {
  const [clickPen, setClickPen] = useState(false)
  const [clickCate, setClickCate] = useState(false)
  const [spend, setSpend] = useState<Spending>()

  // const formattedDate = new Date(
  //   spend.spendingDate as string,
  //   )
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
        console.log(data)
        setSpend(data)
      })
  }
  console.log(spend)
  // const formattedDate = new Date(
  // spend.spendingDate as string,
  // )
  useEffect(() => {
    fetchDetailSpending(selectedSpendingId)
  }, [selectedSpendingId])

  const [postDetailInput, setPostDetailInput] = useState({
    spendingId: '',
    spendingTitle: '',
    spendingCost: '',
    spendingDate: '',
    spendingMemo: '',
    spendingCategoryId: '',
  })

  const {
    spendingId,
    spendingTitle,
    spendingCost,
    spendingDate,
    spendingMemo,
    spendingCategoryId,
  } = postDetailInput

  const handleInput = (e: any) => {
    const { name, value } = e.target
    setPostDetailInput({ ...postDetailInput, [name]: value })
  }

  const clickPencil = () => {
    setClickPen(!clickPen)
    console.log('수정버튼 클릭')
  }

  const clickCategory = () => {
    setClickCate(!clickCate)
  }

  const clickDetele = () => {
    console.log('삭제 클릭')
  }
  const clickSave = () => {
    // if (spendingCost === 0) {
    //   Swal.fire({
    //     width: 300,
    //     text: '금액을 입력해주세요!',
    //     icon: 'error',
    //   })
    // } else if (spendingTitle === '') {
    //   Swal.fire({
    //     width: 300,
    //     text: '거래처를 입력해주세요!',
    //     icon: 'error',
    //   })
    // } else {
    //   fetchAddPost(data)
    // }
  }

  let modalClass = 'modal sm:modal-middle'

  // open 속성이 true인 경우 'modal-open' 클래스를 추가합니다.
  if (open) {
    modalClass += ' modal-open'
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
          {/* 그러면 spendingList가 필요없을 것 같은데? 백엔드 데이터를 가져와야해 */}
          <div>
            <>
              <SpendingCostInput
                value={spend?.spendingCost as number}
                onChange={handleInput}
              />

              {/* 카테고리 들어갈 곳 */}
              <div className="w-full flex flex-row gap-1 py-4 border-b-2 border-outline-container">
                <div className="w-28">
                  <p className="font-scDreamExBold text-base">카테고리</p>
                </div>
                <div className="flex my-auto w-full justify-between">
                  <p className="font-scDreamLight text-base"></p>
                  <div onClick={clickCategory} className="ml-1"></div>
                </div>
              </div>

              <Input
                title="거래처"
                type="text"
                name="spendingTitle"
                value={spend?.spendingTitle as string}
                onChange={handleInput}
              />

              {/* 날짜 입력 */}
              {/* <DateInput
                value={new Date(spend?.spendingDate as string) as Date}
                onChange={handleInput}
              /> */}

              <Input
                title="메모"
                type="text"
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
