'use client'
import FaskMakeButton from '@/app/components/FastMakeButton'
import { recordListStore } from '@/stores/recordListStore'
const UpdateRecordButton = () => {
  const { recordStatus } = recordListStore()
  console.log('레코드버ㅡㄴ', recordStatus)
  return (
    <FaskMakeButton
      path={`${recordStatus.missionId}/${recordStatus.todayRecordId}/create`}
    />
  )
}
export default UpdateRecordButton
