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

export interface SearchState {
  period: Array<number>
  cycle: Array<number>
  category: Array<number>
  [key: string]: any
}

{
  "missionId": "LyowDxcWP8",
  "missionTitle": "일주일동안 5만원 쓰기",
  "missionMemberCount": 1,
  "missionMaxCount": 6,
  "missionImgUrl": "string",
  "missionPurpose": "일주일동안 5만원쓰기 같이 하실 분!!",
  "missionDeposit": 30000,
  "missionIsPublic": true,
  "missionTargetPrice": 50000,
  "missionPeriod": 7,
  "missionTotalCycle": 4,
  "missionCurrentCycle": 0,
  "missionStatus": 0,
  "missionFailureCount": 1,
  "missionStartDate": "2023-09-14",
  "missionCreationTime": "2023-09-14T01:34:05.000+00:00",
  "missionHostEmail": "doacha@seesaw.com",
  "missionCategoryId": 0
}

{
  "missionId": "LyowDxcWP8",
  "missionTitle": "일주일동안 5만원 쓰기",
  "missionMemberCount": 3,
  "missionMaxCount": 6,
  "missionImgUrl": "string",
  "missionPurpose": "일주일동안 5만원쓰기 같이 하실 분!!",
  "missionDeposit": 30000,
  "missionIsPublic": true,
  "missionTargetPrice": 50000,
  "missionPeriod": 7,
  "missionTotalCycle": 4,
  "missionCurrentCycle": 0,
  "missionStatus": 0,
  "missionFailureCount": 0,
  "missionStartDate": "2023-09-14",
  "missionCreationTime": "2023-09-14T01:34:05.000+00:00",
  "missionHostEmail": "doacha@seesaw.com",
  "missionCategoryId": 0
}