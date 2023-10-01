import { create } from 'zustand'
import { RecordList, RecordStatusProps } from '@/app/types'

interface RecordListStore {
  recordList: RecordList[]
  recordStatus: RecordStatusProps
  setRecordList: (ecordList: RecordList[]) => void
  setRecordStatus: (recordStatus: RecordStatusProps) => void
}

export const recordListStore = create<RecordListStore>((set) => ({
  recordList: [],
  recordStatus: {
    missionId: '',
    missionPeriod: 0,
    missionStartDate: '',
    missionTargetPrice: 0,
    pageNumber: 0,
  },

  setRecordList: (recordList: RecordList[]) =>
    set((prev) => ({
      ...prev,
      recordList: prev.recordList.concat(recordList),
    })),

  setRecordStatus: (recordStatus: RecordStatusProps) => {
    set((prev) => ({
      ...prev,
      recordStatus: { ...recordStatus },
      recordList: [],
    }))
  },
}))
