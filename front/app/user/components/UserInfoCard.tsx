'use client'
import { useState } from 'react'
import UserDetailInfo from './UserDetailInfo'
import TextButton from '@/app/components/TextButton'

const UserInfoCard = () => {
  const [openEditPage, setOpenEditPage] = useState<boolean>(false)
  console.log(openEditPage)
  return (
    <div className="card shadow-lg">
      <div className="card-body p-5">
        <TextButton
          innerText="프로필 수정"
          textColor="text-primary"
          onButtonClick={() => setOpenEditPage(true)}
        ></TextButton>
        <UserDetailInfo />
      </div>
    </div>
  )
}

export default UserInfoCard
