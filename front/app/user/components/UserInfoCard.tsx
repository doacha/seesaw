'use client'
import { useState } from 'react'
import UserDetailInfo from './UserDetailInfo'
import TextButton from '@/app/components/TextButton'
import { User } from '@/app/types'
import { user } from '@/app/dummies'

interface Props {
  setOpenEditPage: () => void
}

const UserInfoCard = (props: Props) => {
  return (
    <div className="card shadow-none bg-white rounded-lg">
      <div className="card-body relative p-5 gap-5">
        <div className="absolute top-3 right-3">
          <TextButton
            innerText="프로필 수정"
            textColor="text-primary"
            onButtonClick={props.setOpenEditPage}
          ></TextButton>
        </div>
        <UserDetailInfo user={user} />
        <div className="flex self-center text-xl font-scDreamLight">
          현재까지&nbsp;
          <div className="font-scDreamExBold text-primary">
            {user.savedMoney.toLocaleString()}
          </div>
          원 절약하셨습니다.
        </div>
      </div>
    </div>
  )
}

export default UserInfoCard
