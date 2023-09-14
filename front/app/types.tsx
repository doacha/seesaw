interface User {
  userEmail?: string
  userPassword?: string
  userName?: string
  userNickname: string
  userBirth?: string
  userGender?: boolean
  userPhoneNumber?: string
  userImgUrl: string
  successCnt: number
  failCnt: number
  savedMoney: number
}

interface Mission {
  mission?: string
  dueDate?: string
  missionId?: string
  missionTitle: string
  missionMemberCount?: number
  missionMaxCount?: number
  missionImgUrl: string
  missionPurpose?: string
  missionMinDeposit?: number
  missionIsPublic?: boolean
  missionLimit?: number
  missionPeriod: number
  missionCycle: number
  missionStartDate: string
  missionEndDate: string
  missionResult: string
  missionCreationTime?: string
  missionHostEmail?: string
  categoryId?: number
}

interface ImageFile {
  id: string
  file?: File
  url: string
}

export type { User, Mission, ImageFile }

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
