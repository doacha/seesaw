import { Account } from '@/app/types'
import { create } from 'zustand'

interface AccountList {
  installmentAccount: Account
  accountList: Account[]
  setInstallmentAccount: (account: Account) => void
  setAccountList: (accountList: Account[]) => void
}

export const accountListStore = create<AccountList>((set) => ({
  installmentAccount: {
    accountBalance: 0,
    accountImg: '../seesaw_logo.svg',
    accountInactivate: false,
    accountInterestRate: 2,
    accountName: '봉준이형뱃살계좌',
    accountNum: '123-456-789',
    accountType: 1,
  },
  accountList: [],
  setInstallmentAccount: (account: Account) =>
    set((prev) => ({ ...prev, installmentAccount: account })),
  setAccountList: (accountList: Account[]) =>
    set((prev) => ({ ...prev, accountList: accountList })),
}))
