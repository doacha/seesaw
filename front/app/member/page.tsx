'use client'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import MyMissionListCard from './components/mission/MyMissionListCard'
import MemberInfoCard from './components/profile/MemberInfoCard'
import ProfileEditCard from './components/edit/ProfileEditCard'
import Tab from '../components/Tab'
import AccountCard from './components/account/AccountCard'
import AccountRegistModal from './components/account/AccountRegistModal'
import Loading from '../components/Loading'
import { QueryKey, useQuery } from '@tanstack/react-query'
import PasswordConfirmCard from './components/edit/PasswordConfirmCard'
import InstallmentCreateButton from './installment/components/InstallmentCreateButton'
import { useRouter } from 'next/navigation'
import { accountListStore } from '@/stores/accountList'
import { profileEditInfoStore } from '@/stores/profileEditInfo'
import MemberProfileImg from './components/profile/MemberProfileImg'

const memberPage = () => {
  const router = useRouter()
  const [openEditPage, setOpenEditPage] = useState<boolean>(false)
  const [mainAccountNum, setMainAccountNum] = useState<string>('')
  const [confirmed, setConfirmed] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<string>('tab1')
  const {
    accountList,
    installmentAccount,
    mainAccount,
    setMainAccount,
    setInstallmentAccount,
    setAccountList,
  } = accountListStore()

  const { setProfileEditInfo } = profileEditInfoStore()

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
      const tmp = await res.json()
      return tmp
    } catch (err) {
      console.log(err)
    }
  }

  const getAccountListInfo = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/member/mypage-account`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: 'jiwon@seesaw.com',
        },
      )
      const data = await res.json()
      setMainAccountNum(data.mainAccount)
      setAccountList(data.accountList)
      return data
    } catch (err) {
      console.log(err)
    }
  }

  const {
    isLoading,
    data: profileData,
    error,
  } = useQuery(['profileInfo'], getProfileInfo)

  const { data: accountListData } = useQuery(
    ['accountListInfo'],
    getAccountListInfo,
  )

  useEffect(() => {
    accountList.forEach((account) => {
      if (account.accountType === 1) {
        setInstallmentAccount(account)
      } else if (account.accountNum === mainAccountNum) {
        setMainAccount(account)
      }
    })
  }, [accountListData])

  return (
    <div className="bg-background-fill flex flex-col h-screen w-screen">
      {isLoading ? (
        <Loading />
      ) : (
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
                  setOpenEditPage={() => {
                    setOpenEditPage(false)
                    setConfirmed(false)
                  }}
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

          <div className="relative flex flex-col h-screen py-16 overflow-scroll">
            <Tab
              labels={['내 정보', '내 계좌']}
              activeTab={activeTab}
              handleTabChange={handleTabChange}
            />
            {activeTab === 'tab1' ? (
              <div className="flex flex-col h-full p-5 gap-5">
                <MemberInfoCard
                  setOpenEditPage={() => setOpenEditPage(true)}
                  member={profileData.info}
                />
                <MyMissionListCard missionList={profileData.missionList} />
              </div>
            ) : (
              <div className=" flex flex-col h-min-full p-5 gap-5">
                {installmentAccount ? (
                  <AccountCard
                    account={installmentAccount}
                    bgColor="installment"
                  />
                ) : (
                  <InstallmentCreateButton
                    onClickEvent={() => router.push('member/installment')}
                  />
                )}
                {mainAccount ? (
                  <div className="flex flex-col gap-5">
                    <AccountCard account={mainAccount} bgColor="main" />
                    {accountList.map((account, index) =>
                      account.accountType !== 1 &&
                      account.accountNum !== mainAccountNum ? (
                        <AccountCard account={account} key={index} />
                      ) : null,
                    )}
                  </div>
                ) : (
                  <AccountRegistModal />
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default memberPage
