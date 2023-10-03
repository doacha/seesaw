import { create } from 'zustand'

interface MemberEmail {
  memberEmail: string
  setMemberEmail: (email: string) => void
}

export const memberEmailStore = create<MemberEmail>((set) => ({
  memberEmail: 'doacha@seesaw.com',
  // memberEmail: '',
  setMemberEmail: (email: string) => set({ memberEmail: email }),
}))
