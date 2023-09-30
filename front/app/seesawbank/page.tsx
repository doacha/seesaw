'use client'
import { accountListStore } from '@/stores/accountList'
import Header from '../components/Header'
import AccountCard from '../member/components/account/AccountCard'

const SeesawBankPage = () => {
  const { accountList } = accountListStore()

  return (
    <div className="bg-background-fill flex flex-col h-screen w-screen">
      <Header title="시소뱅크" />

      <div className="flex flex-col h-full py-16 px-5">
        <div className="flex flex-col py-5 gap-5">
          {accountList.map((account) => (
            <AccountCard account={account} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SeesawBankPage
