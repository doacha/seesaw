'use client'
import { useState } from 'react'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import MyMissionListCard from './components/MyMissionListCard'
import UserInfoCard from './components/UserInfoCard'
import ProfileEditCard from './components/ProfileEditCard'

UserInfoCard

const User = () => {
  const [openEditPage, setOpenEditPage] = useState<boolean>(false)
  return (
    <div className="bg-background-fill flex flex-col h-screen w-screen">
      {openEditPage ? (
        <div className="absolute w-full h-full bg-outline z-50 bg-opacity-50">
          <ProfileEditCard />
        </div>
      ) : null}

      <Header title="마이페이지" />
      <div className="flex h-full py-16 px-5">
        <div className="flex flex-col py-5 gap-5">
          <UserInfoCard setOpenEditPage={() => setOpenEditPage(true)} />
          <div className="flex flex-col">
            <MyMissionListCard />
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  )
}

export default User
