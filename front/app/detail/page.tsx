'use client'

import { Spending } from '@/app/types'
import Header from '../components/Header'
import Card from '../components/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import Button from '../components/Button'
// <FontAwesomeIcon icon={faChevronUp} />를 하던가 faChevronDown 에 rotation = {180} 을 넣어

import CategoryComponent from './components/CategoryComponent'
import AccountComponent from './components/AccountComponent'
import DateComponent from './components/DateComponent'
import MemoComponent from './components/MemoComponent'

const spendingList: Spending[] = [
  {
    spendingId: 1,
    spendingTitle: '하늘보리',
    spendingCost: 3800,
    spendingDate: '2023-09-14T04:22:08.885Z',
    spendingCategoryId: 3,
    memberEmail: 'doacha@seesaw.com',
    spendingMemo:
      '나는 목이 마르다.아아아아아아아아아 나는 어디까지 작성이 가능할까? 어디 한번 가보자고 아우 배아파 나는 왜 배가 아프고 왜 지하철은 연착이 되니 짜증나게',
  },
]

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
// Todo.... 수정 삭제 입력 다 고쳐줘야해, component 분리도 해야한다.

const Detail = () => {
  const [clickCate, setClickCate] = useState(false)
  const [clickPen, setClickPen] = useState(false)
  const [clickAcc, setClickAcc] = useState(false)
  const [clickDa, setClickDa] = useState(false)
  const [NewData, setNewData] = useState('')
  const clickCategory = (e: any) => {
    setClickCate(!clickCate)
    console.log('카테고리 클릭')
  }
  const clickPencil = () => {
    setClickPen(!clickPen)
    console.log('수정버튼 클릭')
  }
  const clickAccount = () => {
    setClickAcc(!clickAcc)
    console.log('거래처 클릭')
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
  return (
    <>
      <div className="bg-background-fill flex flex-col h-screen w-screen">
        <Header title="가계부" />
        <div className="flex h-full py-16 px-5">
          <div className="py-5 w-full">
            {spendingList.map((spending, key) => (
              <Card
                key={spending.spendingId}
                title={'거래처'}
                content={
                  <>
                    <div className="flex mb-14 flex-row gap-5">
                      {clickPen ? (
                        <input
                          type="number"
                          id="small-input"
                          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 "
                        />
                      ) : (
                        <span className="font-envR text-3xl">
                          {spending.spendingCost &&
                            spending.spendingCost.toLocaleString('ko-KR')}{' '}
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
                    {spending.spendingCategoryId && (
                      <CategoryComponent
                        category={spending.spendingCategoryId}
                      />
                    )}
                    {/* <div className="w-full flex flex-row gap-1 py-4 border-b-2 border-outline-container">
                      <div className="w-28">
                        <p className="font-scDreamExBold text-base">카테고리</p>
                      </div>
                      <div className="flex my-auto w-full justify-between">
                        <p className="font-scDreamLight text-base">
                          {spending.spendingCategoryId}
                        </p>
                        <div onClick={clickCategory} className="ml-1">
                          {clickCate ? (
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
                    </div> */}

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
                }
              />
            ))}
          </div>
        </div>
        <div className=" mb-24 mx-5 grid grid-cols-3 gap-2">
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
    </>
  )
}

export default Detail
