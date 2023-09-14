'use client'
import { useState } from 'react'
import NavbarButton from './NavbarButton'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const pathname = usePathname()

  //add 버그 있음.
  const router = useRouter()
  const [currentTab, setCurrentTab] = useState<string>('wallet')

  const onTabClick = (value: string) => {
    console.log(value)
    setCurrentTab(value)
    router.push('/' + value)
  }

  return (
    <>
      {pathname !== '/login' && pathname !== '/regist' ? (
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
            icon="user"
            activated={currentTab === 'user' ? true : false}
            onTabClick={() => onTabClick('user')}
          />
        </div>
      ) : null}
    </>
  )
}

export default Navbar
