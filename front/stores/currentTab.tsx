import { Tab } from '@/app/types'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface CurrentTab {
  currentTab: Tab
  setCurrentTab: (tab: Tab) => void
}

export const currentTabStore = create(persist<CurrentTab>( 
  (set) => ({
  currentTab: '',
  setCurrentTab: (tab: Tab) => set({ currentTab: tab }),
}),{
  name: 'currentTabData', // unique name
  storage : createJSONStorage(() => sessionStorage)
} )
)
