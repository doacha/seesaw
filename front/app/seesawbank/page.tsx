'use client'
import { accountListStore } from '@/stores/accountList'
import Header from '../components/Header'
import AccountCard from '../member/components/account/AccountCard'
import { useQuery } from '@tanstack/react-query'
import { memberEmailStore } from '@/stores/memberEmail'
import { Account } from '../types'

const SeesawBankPage = () => {
  const { memberEmail } = memberEmailStore()

  const getAccountListInfo = async () => {
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
      const data = await res.json()
      return data
    } catch (err) {
      console.log(err)
    }
  }

  const { data: accountListData } = useQuery(
    ['accountListInfo'],
    getAccountListInfo,
  )

  return (
    <div className="bg-background-fill flex flex-col h-screen w-screen">
      <Header title="시소뱅크" />

      <div className="flex flex-col h-full py-16 px-5">
        <div className="flex flex-col py-5 gap-5">
          {accountListData.map((account: Account) => (
            <AccountCard account={account} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SeesawBankPage
