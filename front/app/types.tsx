export type User = {
  id: number
  name: string
  email: string
}

export interface MissionCardProps {
  missionId: string
  missionTitle: string
  missionMemberCount: number
  missionMaxCount: number
  missionImgUrl: string
  missionPurpose: string
  missionMinDeposit: number
  missionIsPublic: boolean
  missionLimit: number
  missionPeriod: number
  missionCycle: number
  missionStartDate: string
  missionCreationTime: string
  missionHostEmail: string
  categoryId: number
}

export interface SearchState {
  period: Array<number>
  cycle: Array<number>
  category: Array<number>
  [key: string]: any
}
