import { create } from 'zustand'

interface MemberEmail {
  memberEmail: string
  setMemeberEmail: (email: string) => void
}

export const memberEmailStore = create<MemberEmail>((set) => ({
  //  memberEmail: 'tldnjs324@naver.com',
  memberEmail: '',
  setMemeberEmail: (email: string) => set({ memberEmail: email }),
}))
