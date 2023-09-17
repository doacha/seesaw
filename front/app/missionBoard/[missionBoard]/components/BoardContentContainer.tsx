'use client'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { getCycleTerm } from '@/app/mission/detail/util'
const BoardContentContainer = () => {
  return (
    <div className="rounded-lg bg-background">
      {/* 헤더 */}
      <div className="collapse bg-seesaw-blue-100 rounded-b-none p-5">
        <input type="checkbox" />
        {/* collapase title 간략 정보*/}
        <div className="collapse-title flex flex-col items-center p-0">
          {/* 기간 및 자세히 보기 */}
          <div className="flex justify-between w-full mb-2.5">
            <span>
              <span className="font-scDreamMedium mr-[10px]">4회차</span>
              <span className="text-[10px] text-outline">
                {getCycleTerm(`2023-09-12T14:42:17.000+00:00`, 1, 1)}
              </span>
            </span>
            <FontAwesomeIcon icon={faEllipsis} className="text-outline" />
          </div>
          {/* 프로필 및 등록 시간 */}
          <div className="flex justify-between items-center w-full mb-2.5">
            <span>
              <Image
                src="/차차_군침이.jpg"
                width={35}
                height={35}
                alt="user profile image"
                className="rounded-full inline-block mr-[10px]"
              />
              <span>닉네임</span>
            </span>
            <span className="text-[10px] text-outline">등록시간</span>
          </div>
          {/* 성공 여부 및 잔액 */}
          <div className="w-full flex justify-between">
            <span className="font-scDreamExBold">성공여부</span>
            <span>
              <span className="text-[10px] text-outline mr-[10px]">잔액</span>
              <span className="font-scDreamExBold">16200</span>
            </span>
          </div>
          <div className="w-full text-center">
            <hr className="border-outline my-2.5 w-full" />
            <FontAwesomeIcon icon={faAngleDown} />
          </div>
        </div>
        {/* collpase content - 거래 내역 상세 */}
        <div className=" collapse-content p-0">
          <div className="flex justify-between mb-2">
            <span className="font-scDreamExBold">미션금액</span>
            <span>30000</span>
          </div>
          <hr className="border-outline mb-2" />
          <div className="flex justify-between mb-2">
            <span>내역 1</span>
            <span>20900</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>내역 2</span>
            <span>5900</span>
          </div>
          <hr className="border-outline" />
          <div className="flex justify-between font-scDreamExBold mt-2">
            <span>잔액</span>
            <span>26800</span>
          </div>
        </div>
      </div>
      {/* 컨텐츠영역 */}
      로렝 입섬
    </div>
  )
}

export default BoardContentContainer
