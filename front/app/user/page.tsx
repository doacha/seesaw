'use client'
import { useState } from 'react'
import Header from '../components/Header'
import MyMissionListCard from './components/MyMissionListCard'
import UserInfoCard from './components/UserInfoCard'
import ProfileEditCard from './components/edit/ProfileEditCard'
import Tab from '../components/Tab'
import AccountCard from './components/account/AccountCard'
import AccountRegistModal from './components/account/AccountRegistModal'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { User } from '../types'

const UserPage = () => {
  const [openEditPage, setOpenEditPage] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<string>('tab1')

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const signUp = async () => {
    const value = await fetch(
      `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/member/signup`,
      {
        // force-cache 가 디폴트 옵션, 캐시를 검색해서 일치하는 데이터가 있고 fresh하다면 그 값을 반환. 요청 안보냄.
        // no-store 는 캐시 검색을 하지 않고 항상 다시 data를 서버에서 불러옴.
        cache: 'force-cache',
        //next: false 무한, 0 캐시안함, number 초단위로 캐시 수명 정할수 있음.
        next: { revalidate: false },
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // JSON 데이터를 전송할 경우 지정
        },
        body: JSON.stringify({
          memberEmail: 'jjwoong1733@gmail.com',
          memberPassword: 'ckckdoql6149!',
          memberName: '정재웅',
          memberNickname: '차차아버님',
          memberBirth: '19951026',
          memberGender: false,
        }), // 데이터를 JSON 문자열로 변환하여 전송
      },
    )
  }

  const getUser = async () => {
    const value = await fetch(`/member/mypage`, {
      // force-cache 가 디폴트 옵션, 캐시를 검색해서 일치하는 데이터가 있고 fresh하다면 그 값을 반환. 요청 안보냄.
      // no-store 는 캐시 검색을 하지 않고 항상 다시 data를 서버에서 불러옴.
      // cache: 'force-cache',
      //next: false 무한, 0 캐시안함, number 초단위로 캐시 수명 정할수 있음.
      // next: { revalidate: false },
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // JSON 데이터를 전송할 경우 지정
      },
      body: JSON.stringify('jiwon@seesaw.com'), // 데이터를 JSON 문자열로 변환하여 전송
    })
    console.log('왜 안돼?', value)
    console.log('비동기함수1')
    console.log('비동기함수2')
  }

  getUser()
  // signUp()
  const setUser = async () => {}

  // const queryClient = useQueryClient()
  // const query = useQuery({queryKey: ['user'], queryFn : getUser })
  // const mutation = useMutation({
  //   mutationFn : setUser,
  //   onSuccess : () => {
  //     queryClient.invalidateQueries({queryKey : ['user']})
  //   }
  // })

  return (
    <div className="bg-background-fill flex flex-col h-screen w-screen">
      {openEditPage ? (
        <div className="absolute w-full h-full bg-outline z-50 bg-opacity-50">
          <ProfileEditCard setOpenEditPage={() => setOpenEditPage(false)} />
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
            <UserInfoCard setOpenEditPage={() => setOpenEditPage(true)} />
            <MyMissionListCard />
          </div>
        ) : (
          <div className="flex flex-col h-min-full p-5 gap-5">
            <AccountCard />
            <AccountCard />
            <AccountCard />
            <AccountRegistModal />
          </div>
        )}
      </div>
    </div>
  )
}

export default UserPage
