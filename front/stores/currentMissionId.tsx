import { create } from 'zustand'
import { Mission, MissionList } from '@/app/types'

interface CurrentMissionId {
  currentMissionId: string
  setCurrentMissionId: (missionId: string) => void
}

export const currentMissionIdStore = create<CurrentMissionId>((set) => ({
  currentMissionId: '',
  setCurrentMissionId: (missionId: string) =>
    set({ currentMissionId: missionId }),
}))

