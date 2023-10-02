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
  spendingDate?: string
  spendingCategoryId?: number
  memberEmail: string
  spendingMemo?: string
  spendingCostSum?: number
  spendingMonth?: number
  spendingYear?: number
  spendingDay?: number
  condition?: string
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
  inputText: string
  period: number
  cycle: number
  category: number
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
  missionPenaltyPrice: number
  missionCreationTime: string
  missionHostEmail: string
  missionCategoryId: number
}

export interface MissionCreate {
  imgFile: ImageFile
  missionTitle: string
  missionMaxCount: number
  missionPurpose: string
  missionDeposit: number
  missionIsPublic: boolean
  memberMissionSavingMoney: number
  missionPeriod: number
  missionTotalCycle: number
  missionTargetPrice: number
  missionStartDate: { month: number; day: number }
  missionHostEmail: string
  missionCategoryId: number
  [key: string]: any
}

export interface GroupStatusProps {
  missionId: string
  missionPeriod: number
  missionTargetPrice: number
  missionStartDate: string
  missionCurrentCycle: number
  missionDeposit: number
}

export interface RecordDetail {
  memberImgUrl: string
  memberNickname: string
  recordNumber: number
  recordId: number
  recordTotalCost: number
  recordStatus: number
}

export interface RecordList {
  recordNumber: number
  recordList: Array<{
    recordName: string
    recordCost: number
  }>
}

export interface RecordStatusProps {
  missionId: string
  missionPeriod: number
  missionTargetPrice: number
  missionStartDate: string
  missionCurrentCycle: number
  pageNumber: number
  todayRecordId: number
}

export interface Comment {
  commentId: number
  commentContent: string
  memberNickname: string
  memberEmail: string
  memberImgUrl: string
  commentWriteTime: string
}
