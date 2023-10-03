import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface MemberEmail {
  memberEmail: string
  setMemberEmail: (email: string) => void
}

export const memberEmailStore = create(persist<MemberEmail>((set) => ({
  memberEmail: '',
  setMemberEmail: (email: string) => set({ memberEmail: email }),
}),{
  name: 'memberEmail', // unique name
  storage : createJSONStorage(() => sessionStorage)
}

))
