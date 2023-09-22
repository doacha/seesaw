import * as type from './types'

export const user: type.User = {
  userNickname: '차차아버님',
  userImgUrl: './차차_군침이.jpg',
  successCnt: 2,
  failCnt: 3,
  savedMoney: 200000,
}

export const mission: type.Mission = {
  missionTitle: '술 그만마셔 그러다 뒤져',
  missionCurrentCycle: 1,
  missionImgUrl: '../차차_군침이.jpg',
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
