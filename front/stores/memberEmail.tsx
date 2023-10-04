import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface MemberEmail {
  memberEmail: string
  memberNickname: string
  setMember: (memberEmail: string, memberNickname: string) => void
}

export const memberEmailStore = create(
  persist<MemberEmail>(
    (set) => ({
      memberEmail: '',
      memberNickname: '',
      setMember: (memberEmail: string, memberNickname: string) =>
        set({ memberEmail, memberNickname }),
    }),
    {
      name: 'memberEmail', // unique name
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
