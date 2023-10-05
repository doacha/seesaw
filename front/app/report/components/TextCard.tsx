'use client'

import { Spending } from '@/app/types'
import Loading from '@/app/components/Loading'
// useQuery
import { QueryKey, useQuery } from '@tanstack/react-query'
interface Props {
  spendData: Spending
}

const TextCard = ({ spendData }: Props) => {
  const fetchCompare = async (spendDate: Spending) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/spending/compare`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // JSON 데이터를 전송할 경우 지정
        },
        body: JSON.stringify(spendDate), // 데이터를 JSON 문자열로 변환하여 전송
      },
    )
    return await res.json()
  }

  const {
    isLoading,
    data: compare,
    error,
  } = useQuery(['compare', spendData], () => fetchCompare(spendData))

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-row h-20 w-full bg-white rounded-lg">
          <div className=" my-auto mx-5 w-full">
            <div className="flex font-scDreamMedium text-base">
              저번달에 비해&nbsp;
              <div
                className={
                  compare.difference < 0
                    ? 'font-scDreamExBold  text-error'
                    : 'font-scDreamExBold text-primary'
                }
              >
                {compare.difference < 0
                  ? (-compare.difference).toLocaleString()
                  : compare.difference.toLocaleString()}
              </div>
              {compare.difference < 0 ? '원 더 사용했어요' : '원 덜 사용했어요'}
            </div>
            <p className=" font-scDreamLight text-outline text-sm">
              {compare.difference < 0
                ? '우리 조금 더 아껴써볼까요?'
                : '당신은 절약왕!'}
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default TextCard
