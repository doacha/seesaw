import { create } from 'zustand'
import { Mission, MissionList } from '@/app/types'

interface titleStore {
  missionTitle: string
  setMissionTitle: (missionTitle: string) => void
}

export const missionTitleStore = create<titleStore>((set) => ({
  missionTitle: '미션 제목',
  setMissionTitle: (missionTitle: string) => set({ missionTitle }),
}))
