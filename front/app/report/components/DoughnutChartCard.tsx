'use client'

import Card from '@/app/components/Card'
import { useEffect, useState } from 'react'
import { categoryList, categoryIcon, iconColors } from '@/app/lib/constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import DoughnutChart from './DoughnutChart'
import Loading from '@/app/components/Loading'

import { QueryKey, useQuery } from '@tanstack/react-query'

import { Spending } from '@/app/types'
interface Props {
  spendData: Spending
}

const DoughtnutChartCard = ({ spendData }: Props) => {
  const [isOpened, setIsOpened] = useState<boolean>(false)

  const clickDownArrow = () => {
    setIsOpened(!isOpened)
  }

  useEffect(() => {
    setIsOpened(false)
  }, [spendData])

  const fetchCategorySumList = async (spendDate: Spending) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/spending/category`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(spendDate),
      },
    )
    return await res.json()
  }

  const {
    isLoading,
    data: categorySumList,
    error,
  } = useQuery(['categorySumList', spendData], () =>
    fetchCategorySumList(spendData),
  )

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Card
          title="카테고리 지출현황"
          content={
            <div className="flex w-full flex-col">
              <div className="flex flex-col my-2">
                <p className="font-scDreamExBold text-xl text-surface">
                  {categorySumList[0].spendingCategoryId &&
                    categoryList[categorySumList[0].spendingCategoryId]}
                  에 가장 많이 썼어요
                </p>
                <p className="font-scDreamRegular text-xs text-outline">
                  절약하는 당신은 아름다워!
                </p>
              </div>
              <div className="flex w-full mx-auto p-5">
                <DoughnutChart spendingList={categorySumList} />
              </div>
              <div className="flex w-full flex-col">
                {categorySumList
                  .slice(0, isOpened ? categorySumList.length : 5)
                  .map((element: any, idx: number) => (
                    <div key={idx} className="flex justify-between">
                      <div className="flex flex-row mb-3">
                        <div className="flex w-8 mr-2">
                          <div className="flex mx-auto">
                            {element.spendingCategoryId && (
                              <FontAwesomeIcon
                                icon={categoryIcon[element.spendingCategoryId]}
                                style={{
                                  color: iconColors[element.spendingCategoryId],
                                }}
                                size="xl"
                              />
                            )}
                          </div>
                        </div>
                        <div>
                          {element.spendingCategoryId &&
                            categoryList[element.spendingCategoryId]}
                        </div>
                      </div>
                      <div>
                        {element.spendingCostSum &&
                          element.spendingCostSum.toLocaleString('ko-KR')}
                        원
                      </div>
                    </div>
                  ))}
                <div className="w-full mx-auto mt-3">
                  <div className="border border-outline-container"></div>
                  <div className="w-full flex mt-2">
                    <div
                      className="mx-auto flex flex-row gap-2"
                      onClick={clickDownArrow}
                    >
                      <div className="my-auto">
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          size="lg"
                          style={{
                            color: '#dce1e9',
                            transform: isOpened ? 'rotate(180deg)' : 'none',
                            transition: 'transform 0.3s ease-in-out',
                          }}
                        />
                      </div>
                      <p className=" text-outline">
                        {isOpened ? '접기' : '전체보기'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        />
      )}
    </>
  )
}

export default DoughtnutChartCard
