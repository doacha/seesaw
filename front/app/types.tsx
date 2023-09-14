export interface ImageFile {
  id: string
  file?: File
  url: string
}

export interface User {
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
  missionEndDate: string
  missionCreationTime: string
  missionHostEmail: string
  categoryId: number
  memberMissionStatus?: string
}

export interface Record {
  recordNumber: number
  recordStatus: number
  recordTotalCost: number
  recordId: number
  recordWriteTime: string
  memberEmail: string
  missionId: string
  recordContent: string
}
