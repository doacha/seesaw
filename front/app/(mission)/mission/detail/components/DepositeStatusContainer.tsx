import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFaceDizzy,
  faXmark,
  faArrowRight,
  faMoneyBill1Wave,
  faCoins,
  faShieldHalved,
} from '@fortawesome/free-solid-svg-icons'
import ShieldGroup from './ShieldGroup'
const dummy = {
  missionFailMemberCount: 5,
  missionPrice: 36000,
  missionMyFailureCount: 4,
  missionFailureCount: 8,
  missionTargetPrice: 30000,
  memberNickname: '차차애비',
}

const OverlappedMoneyIcon = ({ size }: { size: string }) => {
  return (
    <span className={`relative text-primary ${size} mr-3`}>
      <FontAwesomeIcon
        icon={faMoneyBill1Wave}
        className="absolute left-[-30px] top-3"
      />
      <FontAwesomeIcon
        icon={faMoneyBill1Wave}
        className="absolute right-1 top-1"
      />
      <FontAwesomeIcon
        icon={faMoneyBill1Wave}
        className="absolute right-3 bottom-5"
      />
    </span>
  )
}

const BrokenShield = ({ isSmall }: { isSmall?: boolean }) => {
  const xMarkSize = isSmall ? 'text-[18px]' : 'text-[50px]'
  const shieldSize = isSmall ? 'text-[25px]' : 'text-[70px]'
  const topPosition = isSmall ? 'top-[9px]' : 'top-[27px]'
  return (
    <div className="relative">
      <FontAwesomeIcon
        icon={faShieldHalved}
        className={`text-primary ${shieldSize}`}
      />
      <FontAwesomeIcon
        icon={faXmark}
        className={`absolute text-error left-0 ${topPosition} ${xMarkSize}`}
      />
    </div>
  )
}

const DepositStatusContainer = () => {
  const data = dummy
  const additionalPrize = data.missionPrice - data.missionTargetPrice

  return (
    <div className="bg-background rounded-lg p-5 m-5">
      <div className="font-scDreamMedium">예치금 현황</div>
      <hr className="border-outline my-2.5" />
      {/* 예치금 현황 */}
      <div className="rounded-lg bg-background-fill p-3">
        <div className="text-outline text-xs mb-2.5">
          현재{' '}
          <span className="text-black text-sm">
            {data.missionFailMemberCount}
          </span>
          명이 미션 실패했어요
        </div>
        <div className="rounded-lg bg-background p-5 flex items-end justify-around">
          <span className="flex gap-3">
            <FontAwesomeIcon
              icon={faFaceDizzy}
              className="text-error text-[40px] my-auto"
            />
            <span className="text-[38px] font-scDreamExBold text-outline">
              x
            </span>
            <span className="text-black text-[40px] font-black">
              {data.missionFailMemberCount}
            </span>
          </span>
          {/* <span className="text-[38px] font-scDreamExBold text-outline">
            &rarr
          </span> */}
          <span>
            <FontAwesomeIcon
              icon={faArrowRight}
              className="text-outline text-[30px] mb-2 mr-5"
            />
            <FontAwesomeIcon
              icon={faCoins}
              className="text-primary text-[40px] mb-2"
            />
            {/* <OverlappedMoneyIcon size="text-[30px]" /> */}
          </span>
        </div>
        {additionalPrize >= 0 && (
          <div className="mt-5 text-sm">
            <span>
              미션 예치금을
              <br />
              <span className="text-primary font-scDreamExBold text-base">
                {data.missionTargetPrice.toLocaleString('ko-KR')} +{' '}
                {additionalPrize.toLocaleString('ko-KR')}
              </span>
              원 받을 수 있어요!
            </span>
          </div>
        )}
        {additionalPrize < 0 && (
          <div className="py-5 p text-sm">
            <span>
              미션 예치금을
              <br />
              <span className="text-red font-scDreamExBold text-red">
                {data.missionTargetPrice.toLocaleString('ko-KR')} -{' '}
                {additionalPrize.toLocaleString('ko-KR')}
              </span>
              원 받습니다...
            </span>
          </div>
        )}
      </div>
      {/* 내 실패 현황 */}
      <div className="rounded-lg bg-background-fill p-3 my-5">
        <div className="text-xs">
          <span className="text-sm font-scDreamMedium mr-1">
            {data.memberNickname}
          </span>
          님의 실패 현황
        </div>
        <div>
          <ShieldGroup
            failureCount={data.missionFailureCount}
            myFailureCount={data.missionMyFailureCount}
          />
        </div>
        <div className="font-scDreamExBold text-right text-[20px]">
          <span className="text-error">{data.missionMyFailureCount}</span>
          <span> / {data.missionFailureCount}</span>
        </div>
      </div>
    </div>
  )
}

export default DepositStatusContainer
