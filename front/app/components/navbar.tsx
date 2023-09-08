'use client'
import { useState } from 'react'
import NavbarButton from './NavbarButton'

const Navbar = () => {
  const [currentTab, setCurrentTab] = useState<string>('wallet')

  const onTabClick = (value: string) => {
    console.log(value)
    setCurrentTab(value)
  }

  return (
    <div className="btm-nav">
      <NavbarButton
        icon="wallet"
        activated={currentTab === 'wallet' ? true : false}
        onTabClick={() => onTabClick('wallet')}
      />
      <NavbarButton
        icon="flag"
        activated={currentTab === 'flag' ? true : false}
        onTabClick={() => onTabClick('flag')}
      />
      <NavbarButton
        icon="user"
        activated={currentTab === 'user' ? true : false}
        onTabClick={() => onTabClick('user')}
      />
    </div>
  )
}

export default Navbar
