'use client'
import NavbarButton from './NavbarButton'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { currentTabStore } from '@/stores/currentTab'
import { Tab } from '../types'
import { useEffect, useState } from 'react'

const Navbar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { currentTab, setCurrentTab } = currentTabStore()


  const onTabClick = (value: Tab) => {
    setCurrentTab(value)
    if (value === 'mission') {
      router.push('/' + 'mission-landing')
    } else {
      router.push('/' + value)
    }
  }

  useEffect(() => {
    console.log('setTab실행')
    if(pathname === '/mission-landing'){
      setCurrentTab('mission')
    }else if(pathname === '/member'){
      setCurrentTab('member')
    }else if(pathname === '/home'){
      setCurrentTab('home')
    }
  }, [])
  

  return (
    <>
      {currentTab !== ''? pathname !== '/' &&
      pathname !== '/login' &&
      pathname !== '/regist' &&
      pathname !== '/seesawbank' &&
      pathname !== '/member/installment' ? (
        <div className="btm-nav bg-white">
          <NavbarButton
            icon="wallet"
            activated={currentTab === 'home' ? true : false}
            onTabClick={() => onTabClick('home')}
          />
          <NavbarButton
            icon="flag"
            activated={currentTab === 'mission' ? true : false}
            onTabClick={() => onTabClick('mission')}
          />
          <NavbarButton
            icon="member"
            activated={currentTab === 'member' ? true : false}
            onTabClick={() => onTabClick('member')}
          />
        </div>
      ) : null : null}
    </>
  )
}

export default Navbar
