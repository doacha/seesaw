export interface ImageFile {
  id: string
  file?: File
  url: string
}

export type Tab = 'home' | 'mission' | 'member'

export interface Account {
  accountImg: string
  accountName: string
  accountNum: string
  accountBalance: number
  accountType: number
  accountInactivate: boolean
  accountInterestRate: number
}

export interface Transaction {
  accountApprovalAmount: number
  amountBalance: number
  accountTransactionTime: string
  accountNum: string
  accountIsDeposit: boolean
  accountTransactionName: string
}

export interface Member {
  memberEmail?: string
  memberPassword?: string
  memberName?: string
  memberNickname: string
  memberBirth?: string
  memberGender?: boolean
  memberPhoneNumber?: string
  memberImgUrl: string
  successMissionCnt?: number
  failMissionCnt?: number
  ingMissionCnt?: number
  savedMoney: number
}

export interface Mission {
  missionId?: string
  missionTitle: string
  missionMemberCount?: number
  missionMaxCount?: number
  missionImgUrl: string
  missionPurpose?: string
  missionDeposit?: number
  missionIsPublic?: boolean
  missionTargetPrice?: number
  missionPeriod: number
  missionTotalCycle?: number
  missionCurrentCycle: number
  missionStartDate: string
  missionEndDate?: string
  missionStatus?: number
  missionCreationTime?: string
  missionHostEmail?: string
  missionCategoryId?: number
  memberMissionStatus?: number
}

export interface Spending {
  spendingId?: number
  spendingTitle?: string
  spendingCost?: number
  spendingDate?: string | undefined
  spendingCategoryId?: number
  memberEmail: string
  spendingMemo?: string
  spendingCostSum?: number
  spendingMonth?: number
  spendingYear?: number
  spendingDay?: number
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

export interface SearchState {
  period: boolean[]
  cycle: boolean[]
  category: boolean[]
  [key: string]: any
}

export interface MissionRequire {}

export interface MissionList {
  missionId: string
  missionTitle: string
  missionMemberCount: number
  missionMaxCount: number
  missionImgUrl: string
  missionTargetPrice: number
  missionPeriod: number
  missionTotalCycle: number
  missionStartDate: string
}

export interface MissionDetail extends MissionList {
  missionPurpose: string
  missionDeposit: number
  missionIsPublic: boolean
  missionCurrentCycle: number
  missionStatus: number
  missionFailureCount: number
  missionCreationTime: string
  missionHostEmail: string
  missionCategoryId: number
}

export interface MissionCreate {
  missionTitle: string
  missionMaxCount: number
  missionImgUrl: string
  missionPurpose: string
  missionDeposit: number
  missionIsPublic: boolean
  missionTargetPrice: number
  missionPeriod: number
  missionTotalCycle: number
  missionStartDate: { month: number; day: number }
  missionHostEmail: string
  missionCategoryId: number
  memberMissionIsSaving: boolean
  [key: string]: any
}
