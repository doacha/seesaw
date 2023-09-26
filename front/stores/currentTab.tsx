import { Tab } from '@/app/types'
import { create } from 'zustand'

interface CurrentTab {
  currentTab: Tab
  setCurrentTab: (tab: Tab) => void
}

export const currentTabStore = create<CurrentTab>((set) => ({
  currentTab: 'home',
  setCurrentTab: (tab: Tab) => set({ currentTab: tab }),
}))
