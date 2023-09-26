import { create } from 'zustand'

interface profileEditInfo {
  newNickname: string
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
  newPassword: '',
  confirmPassword: '',
  phoneNumber: '',
  birth: ['', '', ''],
  setProfileEditInfo: (key: string, value: string) =>
    set((prev) => ({ ...prev, [key]: value })),
  setInitBirthInfo: (birth: string) =>
    set((prev) => {
      return {
        ...prev,
        birth: [
          birth.substring(0, 4),
          birth.substring(4, 6),
          birth.substring(6),
        ],
      }
    }),
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
