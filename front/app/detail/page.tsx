'use client'

import { Spending } from '@/app/types'
import Header from '../components/Header'
import Card from '../components/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
// <FontAwesomeIcon icon={faChevronUp} />를 하던가 faChevronDown 에 rotation = {180} 을 넣어
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

const formattedDate = formatDate(new Date(spendingList[0].spendingDate))

const Detail = () => {
  const [clickCate, setClickCate] = useState(false)
  const [clickPen, setClickPen] = useState(false)
  const clickCategory = (e: any) => {
    setClickCate(!clickCate)
    console.log('카테고리 클릭')
  }
  const clickPencil = () => {
    setClickPen(!clickPen)
    console.log('수정버튼 클릭')
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
                      {clickPen?
                      <input type="text" id="small-input" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 " />
                      :
                      <span className="font-envR text-3xl">
                        {spending.spendingCost.toLocaleString('ko-KR')} 원
                      </span>}
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
                    </div>

                    {/* <div className="w-full flex flex-row gap-1 py-4 border-b-2 border-outline-container">
                    <div className="w-28">
                      <p className="font-scDreamExBold text-base">거래처</p>
                    </div>
                    <div className="flex my-auto w-full justify-between">
                      <p className="font-scDreamLight text-base">
                        {spending.spendingTitle}
                      </p>
                      <div className="ml-1">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          style={{ color: '#001b2a' }}
                        />
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
                      <p className="my-auto font-scDreamLight text-xs">
                        {formattedDate}
                      </p>
                      <div className="ml-1">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          style={{ color: '#001b2a' }}
                        />
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
                  </div> */}
                  </>
                }
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Detail
