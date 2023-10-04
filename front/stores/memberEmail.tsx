import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface MemberEmail {
  memberEmail: string
  memberNickname: string
  setMemberEmail: (email: string) => void
}

export const memberEmailStore = create(
  persist<MemberEmail>(
    (set) => ({
      memberEmail: '',
      memberNickname: '',
      setMemberEmail: (email: string) => set({ memberEmail: email }),
    }),
    {
      name: 'memberEmail', // unique name
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
