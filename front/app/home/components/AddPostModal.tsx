'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import Button from '@/app/components/Button'

type Props = {
  children?: React.ReactNode
  open: boolean
  handleToggle: () => void
}

const AddPostModal = ({ open, handleToggle }: Props) => {
  let modalClass = 'modal sm:modal-middle'

  // open 속성이 true인 경우 'modal-open' 클래스를 추가합니다.
  if (open) {
    modalClass += ' modal-open'
  }

  const [clickPen, setClickPen] = useState(false)
  const [clickAcc, setClickAcc] = useState(false)
  const [clickDa, setClickDa] = useState(false)
  const [clickCate, setClickCate] = useState(false)
  const [clickMemo, setClickMemo] = useState(false)
  const [spendingId, setSpendingId] = useState(0)
  const [NewData, setNewData] = useState('')

  const clickPencil = () => {
    setClickPen(!clickPen)
    console.log('수정버튼 클릭')
  }

  const clickCategory = () => {
    setClickCate(!clickCate)
  }

  const clickDateArrow = () => {
    setClickDa(!clickDa)
  }

  const handleUpdate = (e: any) => {
    setNewData(e.target.value)
  }

  const clickSave = () => {
    console.log('저장클릭')
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
          <div className="flex mb-14 flex-row gap-5">
            {clickPen ? (
              <input
                type="number"
                id="small-input"
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 "
              />
            ) : (
              <span className="font-envR text-3xl">원</span>
            )}
            <div className="flex my-auto" onClick={clickPencil}>
              <FontAwesomeIcon
                icon={faPencil}
                size="xl"
                style={{ color: '#001b2a' }}
              />
            </div>
          </div>
          <div className="w-full flex flex-row gap-1 py-4 border-b-2 border-outline-container">
            <div className="w-28">
              <p className="font-scDreamExBold text-base">카테고리</p>
            </div>

            {/* <div className="flex my-auto w-full justify-between">
              <p className="font-scDreamLight text-base"></p>
              <div onClick={clickCategory} className="ml-1"></div>
            </div> */}
          </div>

          <div className="w-full flex flex-row gap-1 py-4 border-b-2 border-outline-container">
            <div className="w-28">
              <p className="font-scDreamExBold text-base">거래처</p>
            </div>
            <div className="flex my-auto w-full justify-between">
              <input
                className="w-full mr-5"
                type="text"
                placeholder="거래처를 입력하세요"
                onChange={handleUpdate}
              ></input>
            </div>
          </div>

          <div className="w-full flex flex-row gap-1 py-4 border-b-2 border-outline-container">
            <div className="w-28">
              <p className="font-scDreamExBold text-base my-auto">날짜</p>
            </div>
            <div className="flex my-auto w-full justify-between">
              <input
                className="w-full mr-5 font-scDreamLight text-xs"
                type="datetime-local"
                // value={formattedDate}
              ></input>
            </div>
          </div>

          <div className="w-full flex flex-row gap-1 py-4 border-b-2 border-outline-container">
            <div className="w-28">
              <p className="font-scDreamExBold text-base">메모</p>
            </div>
            <div className="flex my-auto w-full justify-between">
              <input
                className="w-full mr-5"
                type="text"
                placeholder="메모를 입력하세요"
                onChange={handleUpdate}
              ></input>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <Button color="primary" label="저장" size="sm" onClick={clickSave} />
        </div>
      </div>
    </div>
  )
}

export default AddPostModal
