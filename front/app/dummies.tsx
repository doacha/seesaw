import * as type from './types'

export const member: type.member = {
  memberNickname: '차차아버님',
  memberImgUrl: './차차_군침이.jpg',
  successCnt: 2,
  failCnt: 3,
  savedMoney: 200000,
}

export const mission: type.Mission = {
  missionTitle: '술 그만마셔 그러다 뒤져',
  missionCurrentCycle: 1,
  missionImgUrl: '../../차차_군침이.jpg',
  missionPeriod: 10,
  missionStartDate: '2023-09-11',
  missionEndDate: '2023-09-30',
  memberMissionStatus: 1,
  missionPurpose: '잠와 죽을 거 같아 신한 해커톤 싫어요 크아아아악.',
}

export const missionList: type.Mission[] = [
  {
    missionId: '1',
    missionTitle: '술 그만마셔 그러다 뒤져',
    missionCurrentCycle: 1,
    missionImgUrl: './차차_군침이.jpg',
    missionPeriod: 10,
    missionStartDate: '2023-09-11',
    missionEndDate: '2023-09-30',
    memberMissionStatus: 0,
  },
  {
    missionId: '2',
    missionTitle: '술 그만마셔 그러다 뒤져',
    missionCurrentCycle: 1,
    missionImgUrl: './차차_군침이.jpg',
    missionPeriod: 10,
    missionStartDate: '2023-09-11',
    missionEndDate: '2023-09-30',
    memberMissionStatus: 0,
  },
  {
    missionId: '3',
    missionTitle: '술 그만마셔 그러다 뒤져',
    missionCurrentCycle: 1,
    missionImgUrl: './차차_군침이.jpg',
    missionPeriod: 10,
    missionStartDate: '2023-09-11',
    missionEndDate: '2023-09-30',
    memberMissionStatus: 1,
  },
  {
    missionId: '4',
    missionTitle: '술 그만마셔 그러다 뒤져',
    missionCurrentCycle: 1,
    missionImgUrl: './차차_군침이.jpg',
    missionPeriod: 10,
    missionStartDate: '2023-09-11',
    missionEndDate: '2023-09-30',
    memberMissionStatus: 1,
  },
  {
    missionId: '5',
    missionTitle: '술 그만마셔 그러다 뒤져',
    missionCurrentCycle: 1,
    missionImgUrl: './차차_군침이.jpg',
    missionPeriod: 10,
    missionStartDate: '2023-09-11',
    missionEndDate: '2023-09-30',
    memberMissionStatus: 1,
  },
  {
    missionId: '6',
    missionTitle: '술 그만마셔 그러다 뒤져',
    missionCurrentCycle: 1,
    missionImgUrl: './차차_군침이.jpg',
    missionPeriod: 10,
    missionStartDate: '2023-09-11',
    missionEndDate: '2023-09-30',
    memberMissionStatus: 2,
  },
]

export const recordList: type.Record[] = [
  {
    memberEmail: 'jjwoong1733@gmail.com',
    missionId: '1',
    recordContent: '커피 끊자 너무 많이 마신다.',
    recordId: 1,
    recordNumber: 1,
    recordStatus: 0,
    recordTotalCost: 30000,
    recordWriteTime: '2023-09-13',
  },
  {
    memberEmail: 'jjwoong1733@gmail.com',
    missionId: '1',
    recordContent: '커피 끊자 너무 많이 마신다.',
    recordId: 1,
    recordNumber: 2,
    recordStatus: 1,
    recordTotalCost: 30000,
    recordWriteTime: '2023-09-13',
  },
  {
    memberEmail: 'jjwoong1733@gmail.com',
    missionId: '1',
    recordContent: '커피 끊자 너무 많이 마신다.',
    recordId: 1,
    recordNumber: 3,
    recordStatus: 2,
    recordTotalCost: 30000,
    recordWriteTime: '2023-09-13',
  },
]

export const account: type.Account = {
  accountImg: './seesaw_logo.svg',
  accountBalance: 310000,
  accountName: '시소적금통장',
  accountNum: '123-45-6789',
  accountInactivate: false,
  accountInterestRate: 5,
  accountType: 1,
}

export const transactionList: type.Transaction[] = [
  {
    accountApprovalAmount: 20000,
    accountNum: '987-65-4321',
    accountTransactionTime: '2023-09-18T13:55:00.111Z',
    amountBalance: 310000,
    accountTransactionName: '차차',
    accountIsDeposit: true,
  },
  {
    accountApprovalAmount: 20000,
    accountNum: '987-65-4321',
    accountTransactionTime: '2023-09-18T13:55:00.111Z',
    amountBalance: 310000,
    accountTransactionName: '차차',
    accountIsDeposit: false,
  },
  {
    accountApprovalAmount: 20000,
    accountNum: '987-65-4321',
    accountTransactionTime: '2023-09-18T13:55:00.111Z',
    amountBalance: 310000,
    accountTransactionName: '차차',
    accountIsDeposit: false,
  },
]

export const MissionCreateDummy = {
  missionTitle: '일주일동안 5만원 쓰기',
  missionMaxCount: 6,
  missionImgUrl: 'string',
  missionPurpose: '일주일동안 5만원쓰기 같이 하실 분!!',
  missionDeposit: 30000,
  missionIsPublic: true,
  missionTargetPrice: 50000,
  missionPeriod: 7,
  missionTotalCycle: 4,
  missionStartDate: '2023-09-14',
  missionHostEmail: 'doacha@seesaw.com',
  missionCategoryId: 0,
  memberMissionIsSaving: true,
}

export const missionCardDummy = {
  missionId: 'ndU1ZQjkV8',
  missionTitle: '일주일동안 5만원 쓰기',
  missionMemberCount: 90,
  missionMaxCount: 99,
  missionImgUrl: '/seesaw_logo.svg',
  missionPurpose: '일주일동안 5만원쓰기 같이 하실 분!!',
  missionMinDeposit: 30000,
  missionIsPublic: true,
  missionLimit: 50000,
  missionPeriod: 4,
  missionCycle: 7,
  missionStartDate: '2023-09-08',
  missionEndDate: '2023-09-08',
  missionCreationTime: '2023-09-08T05:07:56.000+00:00',
  missionHostEmail: 'doacha@seesaw.com',
  categoryId: 0,
}

export const missionDetailDummy = {
  missionId: 'LyowDxcWP8',
  missionTitle: '일주일동안 5만원 쓰기',
  missionMemberCount: 3,
  missionMaxCount: 6,
  missionImgUrl: '/차차_군침이.jpg',
  missionPurpose: '일주일동안 5만원쓰기 같이 하실 분!!',
  missionDeposit: 30000,
  missionIsPublic: true,
  missionTargetPrice: 50000,
  missionPeriod: 7,
  missionTotalCycle: 4,
  missionCurrentCycle: 0,
  missionStatus: 0,
  missionFailureCount: 0,
  missionStartDate: '2023-09-14',
  missionCreationTime: '2023-09-14T01:34:05.000+00:00',
  missionHostEmail: 'doacha@seesaw.com',
  missionCategoryId: 0,
}

export const todayMission = {
  missionCurrentCycle: 5,
  missionTargetPrice: 30000,
  missionTodayList: [
    {
      memberName: '차차아버지',
      memberImgUrl: '/차차_군침이.jpg',
      successCount: 5,
      spending: 30000,
      balance: 20000,
    },
    {
      memberName: '차차아버지',
      memberImgUrl: '/차차_군침이.jpg',
      successCount: 5,
      spending: 40000,
      balance: 0,
    },
    {
      memberName: '차차아버지',
      memberImgUrl: '/차차_군침이.jpg',
      successCount: 5,
      spending: 30000,
      balance: 20000,
    },
    {
      memberName: '차차아버지',
      memberImgUrl: '/차차_군침이.jpg',
      successCount: 5,
      spending: 30000,
      balance: 20000,
    },
    {
      memberName: '차차아버지',
      memberImgUrl: '/차차_군침이.jpg',
      successCount: 5,
      spending: 40000,
      balance: 0,
    },
    {
      memberName: '차차아버지',
      memberImgUrl: '/차차_군침이.jpg',
      successCount: 5,
      spending: 30000,
      balance: 20000,
    },
  ],
}

export const groupMissionHistory = {
  startDate: '2023-09-14',
  groupMissionData: [
    {
      cycleCount: 3,
      successCount: 13,
      failCount: 5,
      missionPeriod: 3,
      individualResult: [
        {
          memberImgUrl: '/차차_군침이.jpg',
          memberName: '차차파더차차파',
          status: true,
          spending: 3000,
          boardId: 1,
        },
        {
          memberImgUrl: '/차차_군침이.jpg',
          memberName: '차차파더',
          status: true,
          spending: 8000,
          boardId: 1,
        },
        {
          memberImgUrl: '/차차_군침이.jpg',
          memberName: '차차파더',
          status: true,
          spending: 15000,
          boardId: 1,
        },
        {
          memberImgUrl: '/차차_군침이.jpg',
          memberName: '차차파더',
          status: false,
          spending: 31000,
          boardId: 1,
        },
        {
          memberImgUrl: '/차차_군침이.jpg',
          memberName: '차차파더',
          status: false,
          spending: 33000,
          boardId: 1,
        },
      ],
    },
    {
      cycleCount: 2,
      successCount: 13,
      failCount: 5,
      missionPeriod: 3,
      individualResult: [
        {
          memberImgUrl: '/차차_군침이.jpg',
          memberName: '차차파더',
          status: true,
          spending: 3000,
          boardId: 1,
        },
        {
          memberImgUrl: '/차차_군침이.jpg',
          memberName: '차차파더',
          status: true,
          spending: 8000,
          boardId: 1,
        },
        {
          memberImgUrl: '/차차_군침이.jpg',
          memberName: '차차파더',
          status: true,
          spending: 15000,
          boardId: 1,
        },
        {
          memberImgUrl: '/차차_군침이.jpg',
          memberName: '차차파더',
          status: false,
          spending: 31000,
          boardId: 1,
        },
        {
          memberImgUrl: '/차차_군침이.jpg',
          memberName: '차차파더',
          status: false,
          spending: 33000,
          boardId: 1,
        },
      ],
    },
    {
      cycleCount: 1,
      successCount: 13,
      failCount: 5,
      missionPeriod: 3,
      individualResult: [
        {
          memberImgUrl: '/차차_군침이.jpg',
          memberName: '차차파더',
          status: true,
          spending: 3000,
          boardId: 1,
        },
        {
          memberImgUrl: '/차차_군침이.jpg',
          memberName: '차차파더',
          status: true,
          spending: 8000,
          boardId: 1,
        },
        {
          memberImgUrl: '/차차_군침이.jpg',
          memberName: '차차파더',
          status: true,
          spending: 15000,
          boardId: 1,
        },
        {
          memberImgUrl: '/차차_군침이.jpg',
          memberName: '차차파더',
          status: false,
          spending: 31000,
          boardId: 1,
        },
        {
          memberImgUrl: '/차차_군침이.jpg',
          memberName: '차차파더',
          status: false,
          spending: 33000,
          boardId: 1,
        },
      ],
    },
  ],
}

export const myMissionHistory = {
  startDate: '2023-09-14',
  missionPeriod: 3,
  missionTargetPrice: 30000,
  cycleResult: [
    {
      cycleCount: 4,
      spendingRecord: [
        {
          recordName: '스타벅수',
          recordPrice: 5500,
        },
        {
          recordName: '스타벅수',
          recordPrice: 5500,
        },
        {
          recordName: '스타벅수',
          recordPrice: 5500,
        },
      ],
    },
    {
      cycleCount: 3,
      spendingRecord: [
        {
          recordName: '스타벅수',
          recordPrice: 5500,
        },
        {
          recordName: '스타벅수',
          recordPrice: 5500,
        },
        {
          recordName: '스타벅수',
          recordPrice: 5500,
        },
        {
          recordName: '스타벅수',
          recordPrice: 5500,
        },
        {
          recordName: '스타벅수',
          recordPrice: 5500,
        },
        {
          recordName: '스타벅수',
          recordPrice: 5500,
        },
      ],
    },
    {
      cycleCount: 2,
      spendingRecord: [
        {
          recordName: '스타벅수',
          recordPrice: 5500,
        },
        {
          recordName: '스타벅수',
          recordPrice: 5500,
        },
        {
          recordName: '스타벅수',
          recordPrice: 5500,
        },
      ],
    },
    {
      cycleCount: 1,
      spendingRecord: [
        {
          recordName: '스타벅수',
          recordPrice: 5500,
        },
        {
          recordName: '스타벅수',
          recordPrice: 5500,
        },
        {
          recordName: '스타벅수',
          recordPrice: 5500,
        },
      ],
    },
  ],
}

const boardDetail = {
  recordId: 1,
  recordContent: '수정을 해보자',
  recordWriteTime: '2023-09-12T14:42:17.000+00:00',
  recordTotalCost: 0,
  recordNumber: 1,
  recordStatus: 0,
  memberEmail: 'doacha1@seesaw.com',
  memberNickname: '도아차',
  memberImgUrl: '/차차_군침이.jpg',
}
