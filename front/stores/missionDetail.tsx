import { create } from 'zustand'
import { Mission, MissionList } from '@/app/types'

interface CurrentMissionList {
  currentCompleteMission: Mission
  setCurrentCompleteMission: (mission: Mission) => void
}

