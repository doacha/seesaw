import { create } from 'zustand'
import { MissionList } from '@/app/types'

interface CurrentMissionList {
  currentMissionList: MissionList[]
  setCurrentMissionList: (missionList: MissionList[]) => void
}

export const missionListStore = create<CurrentMissionList>((set) => ({
  currentMissionList: [],
  setCurrentMissionList: (missionList: MissionList[]) =>
    set({ currentMissionList: missionList }),
}))
