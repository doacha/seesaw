import * as type from './types'

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
    endDate: '2023-09-01',
    startDate: '2023-08-23',
  },
  {
    memberEmail: 'jjwoong1733@gmail.com',
    missionId: '1',
    recordContent: '커피 끊자 너무 많이 마신다.',
    recordId: 1,
    recordNumber: 2,
    recordStatus: 1,
    recordTotalCost: 30000,
    endDate: '2023-09-01',
    startDate: '2023-08-23',
  },
  {
    memberEmail: 'jjwoong1733@gmail.com',
    missionId: '1',
    recordContent: '커피 끊자 너무 많이 마신다.',
    recordId: 1,
    recordNumber: 3,
    recordStatus: 2,
    recordTotalCost: 30000,
    endDate: '2023-09-01',
    startDate: '2023-08-23',
  },
]

export const transactionList: type.Transaction[] = [
  {
    accountApprovalAmount: 20000,
    accountNum: '987-65-4321',
    accountTransactionTime: '2023-09-18T13:55:00.111Z',
    accountBalance: 123123,
    accountTransactionName: '차차',
  },
  {
    accountApprovalAmount: 20000,
    accountNum: '987-65-4321',
    accountTransactionTime: '2023-09-18T13:55:00.111Z',
    accountBalance: 310000,
    accountTransactionName: '차차',
  },
  {
    accountApprovalAmount: 20000,
    accountNum: '987-65-4321',
    accountTransactionTime: '2023-09-18T13:55:00.111Z',
    accountBalance: 310000,
    accountTransactionName: '차차',
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

export const account: type.Account = {
  accountImg: './seesaw_logo.svg',
  accountBalance: 310000,
  accountName: '시소적금통장',
  accountNum: '123-45-6789',
  accountInactivate: false,
  accountInterestRate: 5,
  accountType: 1,
}
export const categorySumList: type.Spending[] = [
  {
    spendingCostSum: 2220000,
    spendingMonth: 9,
    memberEmail: 'test',
    spendingCategoryId: 2,
  },
  {
    spendingCostSum: 2000000,
    spendingMonth: 9,
    memberEmail: 'test',
    spendingCategoryId: 5,
  },
  {
    spendingCostSum: 180000,
    spendingMonth: 9,
    memberEmail: 'test',
    spendingCategoryId: 3,
  },
  {
    spendingCostSum: 20000,
    spendingMonth: 9,
    memberEmail: 'test',
    spendingCategoryId: 4,
  },
  {
    spendingCostSum: 180000,
    spendingMonth: 9,
    memberEmail: 'test',
    spendingCategoryId: 5,
  },
  {
    spendingCostSum: 20000,
    spendingMonth: 9,
    memberEmail: 'test',
    spendingCategoryId: 7,
  },
  {
    spendingCostSum: 20000,
    spendingMonth: 9,
    memberEmail: 'test',
    spendingCategoryId: 8,
  },
  {
    spendingCostSum: 20000,
    spendingMonth: 9,
    memberEmail: 'test',
    spendingCategoryId: 10,
  },
  {
    spendingCostSum: 20000,
    spendingMonth: 9,
    memberEmail: 'test',
    spendingCategoryId: 11,
  },
  {
    spendingCostSum: 20000,
    spendingMonth: 9,
    memberEmail: 'test',
    spendingCategoryId: 12,
  },
  {
    spendingCostSum: 20000,
    spendingMonth: 9,
    memberEmail: 'test',
    spendingCategoryId: 13,
  },
  {
    spendingCostSum: 20000,
    spendingMonth: 9,
    memberEmail: 'test',
    spendingCategoryId: 14,
  },
  {
    spendingCostSum: 20000,
    spendingMonth: 9,
    memberEmail: 'test',
    spendingCategoryId: 15,
  },
]

export const spend: type.Spending[] = [
  {
    spendingCostSum: 2240000,
    spendingMonth: 9,
    memberEmail: 'doacha@seesaw.com',
  },
]

export const spendingList: type.Spending[] = [
  {
    spendingId: 3,
    spendingTitle: 'test',
    spendingCost: 1110000,
    spendingDate: '2023-09-13T07:36:18.000+00:00',
    spendingCategoryId: 1,
    memberEmail: 'doacha@seesaw.com',
  },
  {
    spendingId: 0,
    spendingTitle: 'test',
    spendingCost: 1110000,
    spendingDate: '2023-09-15T07:36:18.000+00:00',
    spendingCategoryId: 2,
    memberEmail: 'doacha@seesaw.com',
  },
  {
    spendingId: 2,
    spendingTitle: 'testzzz',
    spendingCost: 111,
    spendingDate: '2023-09-13T07:40:06.978+00:00',
    spendingCategoryId: 18,
    memberEmail: 'doacha@seesaw.com',
  },
]

export const sumList: type.Spending[] = [
  {
    spendingCostSum: 224000,
    spendingDate: '2023-09-01T04:32:44.853Z',
    memberEmail: 'doacha@seesaw.com',
  },
  {
    spendingCostSum: 324000,
    spendingDate: '2023-09-02T04:32:44.853Z',
    memberEmail: 'doacha@seesaw.com',
  },
  {
    spendingCostSum: 440000,
    spendingDate: '2023-09-03T04:32:44.853Z',
    memberEmail: 'doacha@seesaw.com',
  },
  {
    spendingCostSum: 143000,
    spendingDate: '2023-09-04T04:32:44.853Z',
    memberEmail: 'doacha@seesaw.com',
  },
  {
    spendingCostSum: 530000,
    spendingDate: '2023-09-05T04:32:44.853Z',
    memberEmail: 'doacha@seesaw.com',
  },
  {
    spendingCostSum: 233400,
    spendingDate: '2023-09-06T04:32:44.853Z',
    memberEmail: 'doacha@seesaw.com',
  },
  {
    spendingCostSum: 358000,
    spendingDate: '2023-09-07T04:32:44.853Z',
    memberEmail: 'doacha@seesaw.com',
  },
  {
    spendingCostSum: 150000,
    spendingDate: '2023-09-08T04:32:44.853Z',
    memberEmail: 'doacha@seesaw.com',
  },
  {
    spendingCostSum: 150000,
    spendingDate: '2023-09-09T04:32:44.853Z',
    memberEmail: 'doacha@seesaw.com',
  },
  {
    spendingCostSum: 150000,
    spendingDate: '2023-09-10T04:32:44.853Z',
    memberEmail: 'doacha@seesaw.com',
  },
  {
    spendingCostSum: 13300,
    spendingDate: '2023-09-11T04:32:44.853Z',
    memberEmail: 'doacha@seesaw.com',
  },
  {
    spendingCostSum: 89000,
    spendingDate: '2023-09-12T04:32:44.853Z',
    memberEmail: 'doacha@seesaw.com',
  },
  {
    spendingCostSum: 74000,
    spendingDate: '2023-09-13T04:32:44.853Z',
    memberEmail: 'doacha@seesaw.com',
  },
  {
    spendingCostSum: 17800,
    spendingDate: '2023-09-14T04:32:44.853Z',
    memberEmail: 'doacha@seesaw.com',
  },
  {
    spendingCostSum: 0,
    spendingDate: '2023-09-15T04:32:44.853Z',
    memberEmail: 'doacha@seesaw.com',
  },
  {
    spendingCostSum: 18000,
    spendingDate: '2023-09-16T04:32:44.853Z',
    memberEmail: 'doacha@seesaw.com',
  },
  {
    spendingCostSum: 19800,
    spendingDate: '2023-09-17T04:32:44.853Z',
    memberEmail: 'doacha@seesaw.com',
  },
  {
    spendingCostSum: 9500,
    spendingDate: '2023-09-18T04:32:44.853Z',
    memberEmail: 'doacha@seesaw.com',
  },
  {
    spendingCostSum: 95000,
    spendingDate: '2023-09-19T04:32:44.853Z',
    memberEmail: 'doacha@seesaw.com',
  },
  {
    spendingCostSum: 65456,
    spendingDate: '2023-09-20T04:32:44.853Z',
    memberEmail: 'doacha@seesaw.com',
  },
  {
    spendingCostSum: 3250,
    spendingDate: '2023-09-21T04:32:44.853Z',
    memberEmail: 'doacha@seesaw.com',
  },
  {
    spendingCostSum: 68700,
    spendingDate: '2023-09-22T04:32:44.853Z',
    memberEmail: 'doacha@seesaw.com',
  },
  {
    spendingCostSum: 90000,
    spendingDate: '2023-09-23T04:32:44.853Z',
    memberEmail: 'doacha@seesaw.com',
  },
  {
    spendingCostSum: 110000,
    spendingDate: '2023-09-24T04:32:44.853Z',
    memberEmail: 'doacha@seesaw.com',
  },
  {
    spendingCostSum: 8000,
    spendingDate: '2023-09-25T04:32:44.853Z',
    memberEmail: 'doacha@seesaw.com',
  },
  {
    spendingCostSum: 80000,
    spendingDate: '2023-09-26T04:32:44.853Z',
    memberEmail: 'doacha@seesaw.com',
  },
  {
    spendingCostSum: 46500,
    spendingDate: '2023-09-27T04:32:44.853Z',
    memberEmail: 'doacha@seesaw.com',
  },
  {
    spendingCostSum: 98500,
    spendingDate: '2023-09-28T04:32:44.853Z',
    memberEmail: 'doacha@seesaw.com',
  },
  {
    spendingCostSum: 150000,
    spendingDate: '2023-09-29T04:32:44.853Z',
    memberEmail: 'doacha@seesaw.com',
  },
  {
    spendingCostSum: 380000,
    spendingDate: '2023-09-30T04:32:44.853Z',
    memberEmail: 'doacha@seesaw.com',
  },
]

export const bankList = [
  {
    bankName: '시소뱅크',
    bankImg:
      'https://seesawawsbucket.s3.ap-northeast-2.amazonaws.com/profile/%EC%A0%95%EB%B0%A9%ED%98%95%EB%A1%9C%EA%B3%A0.png',
  },
  {
    bankName: '카카오뱅크',
    bankImg:
      'https://seesawawsbucket.s3.ap-northeast-2.amazonaws.com/profile/%EC%B9%B4%EC%B9%B4%EC%98%A4%EB%B1%85%ED%81%AC_%EB%A1%9C%EA%B3%A0_1920.png',
  },
  {
    bankName: '국민은행',
    bankImg:
      'https://seesawawsbucket.s3.ap-northeast-2.amazonaws.com/profile/%EA%B5%AD%EB%AF%BC%EC%9D%80%ED%96%89.jpg',
  },
  {
    bankName: '하나은행',
    bankImg:
      'https://seesawawsbucket.s3.ap-northeast-2.amazonaws.com/profile/img-hana-symbol.png',
  },
]

export const bankList2 = [
  {
    bankName: '우리은행',
    bankImg:
      'https://seesawawsbucket.s3.ap-northeast-2.amazonaws.com/profile/200px-%EC%9A%B0%EB%A6%AC%EC%9D%80%ED%96%89_%EB%A1%9C%EA%B3%A0.png',
  },
  {
    bankName: '농협은행',
    bankImg:
      'https://seesawawsbucket.s3.ap-northeast-2.amazonaws.com/profile/%EB%A1%9C%EA%B3%A0%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C-%EB%86%8D%ED%98%91%EB%A1%9C%EA%B3%A0png1.png',
  },
  {
    bankName: '기업은행',
    bankImg:
      'https://seesawawsbucket.s3.ap-northeast-2.amazonaws.com/profile/%EA%B8%B0%EC%97%85.png',
  },
  {
    bankName: '신한은행',
    bankImg:
      'https://seesawawsbucket.s3.ap-northeast-2.amazonaws.com/profile/shc_symbol_ci.png',
  },
]
