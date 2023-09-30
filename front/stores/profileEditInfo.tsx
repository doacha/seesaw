import { create } from 'zustand'

interface profileEditInfo {
  newNickname: string
  prevPassword: string
  newPassword: string
  confirmPassword: string
  phoneNumber: string
  birth: string[]
  [key: string]: any
  setProfileEditInfo: (key: string, value: string) => void
  setBirthInfo: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export const profileEditInfoStore = create<profileEditInfo>((set) => ({
  newNickname: '',
  prevPassword: '',
  newPassword: '',
  confirmPassword: '',
  phoneNumber: '',
  birth: ['', '', ''],
  setProfileEditInfo: (key: string, value: string) =>
    set((prev) => ({ ...prev, [key]: value })),
  setBirthInfo: (e: React.ChangeEvent<HTMLSelectElement>) =>
    set((prev) => {
      if (e.target.name === 'year') {
        return {
          ...prev,
          birth: [e.target.value, prev.birth[1], prev.birth[2]],
        }
      } else if (e.target.name === 'month') {
        return {
          ...prev,
          birth: [prev.birth[0], e.target.value, prev.birth[2]],
        }
      } else {
        return {
          ...prev,
          birth: [prev.birth[0], prev.birth[1], e.target.value],
        }
      }
    }),
}))
