import { create } from 'zustand'
import { RecordList, RecordStatusProps } from '@/app/types'

interface RecordListStore {
  recordList: RecordList[]
  recordMap: any
  recordStatus: RecordStatusProps
  setRecordList: (
    recordList: RecordList[],
    recordStatus: RecordStatusProps,
  ) => void
  setRecordStatus: (recordStatus: RecordStatusProps) => void
  setTodayRecordId: (recordID: number, recordStatus: RecordStatusProps) => void
  setRecordMap: (recordMap: any) => void
}

export const recordListStore = create<RecordListStore>((set) => ({
  recordList: [],
  recordMap: {},
  recordStatus: {
    missionId: '',
    missionPeriod: 0,
    missionStartDate: '',
    missionTargetPrice: 0,
    missionCurrentCycle: 0,
    todayRecordId: 0,
    pageNumber: 0,
  },

  setRecordList: (recordList: RecordList[], recordStatus: RecordStatusProps) =>
    set((prev) => ({
      ...prev,
      recordStatus: recordStatus,
      recordList: prev.recordList.concat(recordList),
    })),

  setRecordStatus: (recordStatus: RecordStatusProps) => {
    set((prev) => ({
      ...prev,
      recordStatus: { ...recordStatus },
      recordList: [],
      // recordMap: {},
    }))
  },

  setTodayRecordId: (recordId: number, recordStatus: RecordStatusProps) => {
    const newRecordStatus = { ...recordStatus }
    newRecordStatus.todayRecordId = recordId
    set((prev) => ({
      ...prev,
      recordStatus: newRecordStatus,
    }))
  },

  setRecordMap: (recordMap: any) => {
    set((prev) => ({ ...prev, recordMap: { ...prev.recordMap, ...recordMap } }))
  },
}))
