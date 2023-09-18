'use client'
import { useState } from 'react'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import MyMissionListCard from './components/MyMissionListCard'
import UserInfoCard from './components/UserInfoCard'
import ProfileEditCard from './components/edit/ProfileEditCard'
import Tab from '../components/Tab'
import AccountCard from './components/account/AccountCard'

const User = () => {
  const [openEditPage, setOpenEditPage] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<string>('tab1')

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }
  return (
    <div className="bg-background-fill flex flex-col h-screen w-screen">
      {openEditPage ? (
        <div className="absolute w-full h-full bg-outline z-50 bg-opacity-50">
          <ProfileEditCard setOpenEditPage={() => setOpenEditPage(false)} />
        </div>
      ) : null}

      <Header title="마이페이지" />

      <div className="flex flex-col h-full py-16 overflow-auto">
        <Tab
          labels={['내 정보', '내 계좌']}
          activeTab={activeTab}
          handleTabChange={handleTabChange}
        />
        {activeTab === 'tab1' ? (
          <div className="flex flex-col h-full p-5 gap-5">
            <UserInfoCard setOpenEditPage={() => setOpenEditPage(true)} />
            <MyMissionListCard />
          </div>
        ) : (
          <div className="flex flex-col h-full p-5 gap-5">
            <AccountCard />
            <AccountCard />
            <AccountCard />
          </div>
        )}
      </div>
    </div>
  )
}

export default User
