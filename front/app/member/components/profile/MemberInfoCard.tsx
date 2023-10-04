'use client'
import { useState } from 'react'
import MemberDetailInfo from './MemberDetailInfo'
import TextButton from '@/app/components/TextButton'
import { Member } from '@/app/types'
import { member } from '@/app/dummies'

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
        <div className="flex self-center text-lg font-scDreamLight whitespace-nowrap">
          현재까지&nbsp;
          <div className="font-scDreamExBold text-primary">
            {member.saving?.toLocaleString()}
          </div>
          원 절약하셨습니다.
        </div>
      </div>
    </div>
  )
}

export default memberInfoCard
