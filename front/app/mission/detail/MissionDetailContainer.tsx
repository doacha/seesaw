import Image from 'next/image'
import Capsule from '@/app/components/Capsule'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMoneyBillWave,
  faCalendarCheck,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import {
  categoryList,
  missionCycleArray,
  missionPeriodArray,
} from '@/app/lib/constants'
const MissionDetailContainer = ({ missionDetailProps }) => {
  return (
    <div className="rounded-lg my-[50px] bg-background">
      <div className="w-full h-[210px] overflow-hidden relative rounded-t-lg">
        <Image
          src="/차차_군침이.jpg"
          alt="미션 대표 이미지"
          width={390}
          height={210}
          layout="responsive"
          sizes="100%"
          className="absolute top-[-50%]"
        />
      </div>
      <div className="px-5 py-2.5">
        {/* 타이틀 */}
        <div className="flex justify-between mb-2.5">
          <div className="text-base font-scDreamExBold">{`미션 타이틀`}</div>
          <div className="text-sm">
            <FontAwesomeIcon icon={faUser} className="text-primary" />
            {`인원`}
          </div>
        </div>
        {/* 내용 */}
        <div className="text-sm mb-2.5">
          1일 1차차 사진찍어 올리기 챌린지입니다.
        </div>
        <div></div>
        {/* 카테고리 */}
        <Capsule bgColor="3" textColor="background">
          {`${categoryList[3]}`}
        </Capsule>
        {/* 금액 */}
        <div>
          <FontAwesomeIcon icon={faMoneyBillWave} />
          {`예치금`}
        </div>
        {/* 일정 */}
        <div>
          <FontAwesomeIcon icon={faCalendarCheck} />
          <Capsule
            bgColor="background-fill"
            textColor="black"
          >{`period`}</Capsule>
          <Capsule
            bgColor="background-fill"
            textColor="black"
          >{`cycle`}</Capsule>
          <span>{`n회`}</span>
        </div>
        {/* 실패 한도 */}
        <div>{`실패 한도: n회`}</div>
      </div>
    </div>
  )
}

export default MissionDetailContainer
