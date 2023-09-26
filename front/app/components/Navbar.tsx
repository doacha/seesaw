'use client'
import NavbarButton from './NavbarButton'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { currentTabStore } from '@/stores/currentTab'
import { Tab } from '../types'

const Navbar = () => {
  const pathname = usePathname()

  //add 버그 있음.
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

  return (
    <>
      {pathname !== '/login' &&
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
      ) : null}
    </>
  )
}

export default Navbar
