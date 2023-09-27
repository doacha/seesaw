'use client'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import MyMissionListCard from './components/mission/MyMissionListCard'
import MemberInfoCard from './components/profile/MemberInfoCard'
import ProfileEditCard from './components/edit/ProfileEditCard'
import Tab from '../components/Tab'
import AccountCard from './components/account/AccountCard'
import AccountRegistModal from './components/account/AccountRegistModal'
import { QueryKey, useQuery } from '@tanstack/react-query'
import PasswordConfirmCard from './components/edit/PasswordConfirmCard'
import InstallmentCreateButton from './installment/components/InstallmentCreateButton'
import { useRouter } from 'next/navigation'

const memberPage = () => {
  const router = useRouter()
  const [openEditPage, setOpenEditPage] = useState<boolean>(false)
  const [confirmed, setConfirmed] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<string>('tab1')

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const handleConfirmed = () => {
    setConfirmed(true)
  }

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  const getProfileInfo = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/member/mypage`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: 'doacha@seesaw.com',
        },
      )
      return await res.json()
    } catch (err) {
      console.log(err)
    }
  }

  const getAccountInfo = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SEESAW_BANK_API_URL}/account/accounts`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: 'jiwon',
        },
      )
      return await res.json()
    } catch (err) {
      console.log(err)
    }
  }

  const { isLoading, data, error } = useQuery(['profileInfo'], getProfileInfo)

  return (
    <div className="bg-background-fill flex flex-col h-screen w-screen">
      {isLoading ? null : (
        <div>
          {openEditPage ? (
            <div
              className="absolute w-full h-full bg-outline z-50 bg-opacity-50 flex items-center justify-center"
              onClick={() => {
                setOpenEditPage(false)
                setConfirmed(false)
              }}
            >
              {confirmed ? (
                <ProfileEditCard
                  setOpenEditPage={() => setOpenEditPage(false)}
                  handleModalClick={handleModalClick}
                />
              ) : (
                <PasswordConfirmCard
                  handleConfirmed={handleConfirmed}
                  handleModalClick={handleModalClick}
                />
              )}
            </div>
          ) : null}

          <Header title="마이페이지" />

          <div className="flex flex-col h-full py-16 overflow-scroll">
            <Tab
              labels={['내 정보', '내 계좌']}
              activeTab={activeTab}
              handleTabChange={handleTabChange}
            />
            {activeTab === 'tab1' ? (
              <div className="flex flex-col h-full p-5 gap-5">
                <MemberInfoCard
                  setOpenEditPage={() => setOpenEditPage(true)}
                  member={data.info}
                />
                <MyMissionListCard missionList={data.missionList} />
              </div>
            ) : (
              <div className="flex flex-col h-min-full p-5 gap-5">
                {/* <AccountCard />
                <AccountCard />
                <AccountCard /> */}
                <InstallmentCreateButton
                  onClickEvent={() => router.push('member/installment')}
                />
                <AccountRegistModal />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default memberPage
