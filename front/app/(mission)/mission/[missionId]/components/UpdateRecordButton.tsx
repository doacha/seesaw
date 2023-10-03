'use client'
import FaskMakeButton from '@/app/components/FastMakeButton'
import { recordListStore } from '@/stores/recordListStore'
const UpdateRecordButton = () => {
  const { recordStatus } = recordListStore()

  return (
    <FaskMakeButton
      path={`${recordStatus.missionId}/${recordStatus.todayRecordId}/create`}
    />
  )
}
export default UpdateRecordButton
