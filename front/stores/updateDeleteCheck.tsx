import { create } from 'zustand'

interface UpdateDeleteCheck {
  checkUpdateDelete: boolean
  setCheckUpdateDelete: (prev: boolean) => void // 매개변수 prev 추가
}

export const UpdateDeleteCheckStore = create<UpdateDeleteCheck>((set) => ({
  checkUpdateDelete: false,
  setCheckUpdateDelete: () =>
    set((state) => ({ checkUpdateDelete: !state.checkUpdateDelete })),
}))
