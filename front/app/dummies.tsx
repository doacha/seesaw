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
