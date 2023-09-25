'use client'

import Button from '@/app/components/Button'
import Card from '@/app/components/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

import { spendingList } from '@/app/dummies'

type Props = {
  children?: React.ReactNode
  open: boolean
  handleToggle: () => void
  selectedSpendingId: number
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

const formattedDate =
  spendingList[0].spendingDate &&
  formatDate(new Date(spendingList[0].spendingDate))

const DetailModal = ({
  children,
  open,
  handleToggle,
  selectedSpendingId,
}: Props) => {
  const [clickPen, setClickPen] = useState(false)
  const [clickAcc, setClickAcc] = useState(false)
  const [clickDa, setClickDa] = useState(false)
  const [clickCate, setClickCate] = useState(false)
  const [spendingId, setSpendingId] = useState(0)
  const [newData, setNewData] = useState('')

  const clickPencil = () => {
    setClickPen(!clickPen)
    console.log('수정버튼 클릭')
  }
  const clickAccount = () => {
    setClickAcc(!clickAcc)
    console.log('거래처 클릭')
  }

  const clickCategory = () => {
    setClickCate(!clickCate)
  }
  const clickDate = () => {
    setClickDa(!clickDa)
  }
  const handleUpdate = (e: any) => {
    setNewData(e.target.value)
  }

  const clickDetele = () => {
    console.log('삭제 클릭')
  }
  const clickSave = () => {
    console.log('저장클릭')
  }

  let modalClass = 'modal sm:modal-middle'

  // open 속성이 true인 경우 'modal-open' 클래스를 추가합니다.
  if (open) {
    modalClass += ' modal-open'
  }
  console.log(selectedSpendingId)

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
          {spendingList.map((spending, key) => (
            <>
              {spending.spendingId === selectedSpendingId && (
                <>
                  <div key={key} className="flex mb-14 flex-row gap-5">
                    {clickPen ? (
                      <input
                        type="number"
                        id="small-input"
                        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 "
                        value={newData}
                        onChange={handleUpdate}
                      />
                    ) : (
                      <span className="font-envR text-3xl">
                        {spending.spendingCost &&
                          spending.spendingCost.toLocaleString('ko-KR')}
                        원
                      </span>
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
                    <div className="flex my-auto w-full justify-between">
                      <p className="font-scDreamLight text-base"></p>
                      <div onClick={clickCategory} className="ml-1"></div>
                    </div>
                  </div>

                  <div className="w-full flex flex-row gap-1 py-4 border-b-2 border-outline-container">
                    <div className="w-28">
                      <p className="font-scDreamExBold text-base">거래처</p>
                    </div>
                    <div className="flex my-auto w-full justify-between">
                      {clickAcc ? (
                        <p className="font-scDreamLight text-base">
                          {spending.spendingTitle}
                        </p>
                      ) : (
                        <input
                          className="w-full mr-5"
                          type="text"
                          value={spending.spendingTitle}
                          onChange={handleUpdate}
                        ></input>
                      )}
                      <div onClick={clickAccount} className="ml-1">
                        {clickAcc ? (
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

                  <div className="w-full flex flex-row gap-1 py-4 border-b-2 border-outline-container">
                    <div className="w-28">
                      <p className="font-scDreamExBold text-base my-auto">
                        날짜
                      </p>
                    </div>
                    <div className="flex my-auto w-full justify-between">
                      {clickDa ? (
                        <p className="my-auto font-scDreamLight text-xs">
                          {formattedDate}
                        </p>
                      ) : (
                        <input
                          className="w-full mr-5 font-scDreamLight text-xs"
                          type="datetime-local"
                          // value={formattedDate}
                        ></input>
                      )}
                      <div onClick={clickDate} className="ml-1">
                        {clickDa ? (
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

                  <div className="w-full flex flex-row gap-1 py-4 border-b-2 border-outline-container">
                    <div className="w-28">
                      <p className="font-scDreamExBold text-base">메모</p>
                    </div>
                    <div className="flex my-auto w-full justify-between">
                      <p className="font-scDreamLight text-sm">
                        {spending.spendingMemo}
                      </p>
                      <div className="ml-1">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          style={{ color: '#001b2a' }}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          ))}
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
