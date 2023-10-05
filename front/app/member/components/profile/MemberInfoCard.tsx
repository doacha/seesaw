'use client'
import { useState } from 'react'
import MemberDetailInfo from './MemberDetailInfo'
import TextButton from '@/app/components/TextButton'
import { Member } from '@/app/types'

interface Props {
  member: Member
  setOpenEditPage: () => void
}

const memberInfoCard = (props: Props) => {
  return (
    <div className="card shadow-none bg-background rounded-lg">
      <div className="card-body relative p-5 gap-5">
        <div className="absolute top-3 right-3">
          <TextButton
            innerText="프로필 수정"
            textColor="text-primary"
            onButtonClick={props.setOpenEditPage}
          ></TextButton>
        </div>
        <MemberDetailInfo member={props.member} />
        <div className="flex flex-col self-center text-lg font-scDreamLight whitespace-nowrap">
          <div className="flex">
            {props.member.savings < 0 ? (
              <div>미션 중&nbsp;</div>
            ) : (
              <div>미션으로&nbsp;</div>
            )}
            <div
              className={
                props.member.savings < 0
                  ? 'font-scDreamExBold text-error'
                  : 'font-scDreamExBold text-primary'
              }
            >
              {props.member.savings < 0
                ? (-props.member.savings).toLocaleString()
                : props.member.savings.toLocaleString()}
            </div>
            {props.member.savings < 0
              ? '원 더 쓰셨습니다.'
              : '원 절약하셨습니다.'}
          </div>
          {props.member.savings < 0 ? (
            <div className="self-center">조금 더 적극적으로 참여해보아요</div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default memberInfoCard
