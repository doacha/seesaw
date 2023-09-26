import { create } from 'zustand'

interface MemberEmail {
  memberEmail: string
  setMemberEmail: (email: string) => void
}

export const memberEmailStore = create<MemberEmail>((set) => ({
  memberEmail: '',
  setMemberEmail: (email: string) => set({ memberEmail: email }),
}))
