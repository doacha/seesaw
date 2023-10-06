'use client'
import FaskMakeButton from '@/app/components/FastMakeButton'
import { recordListStore } from '@/stores/recordListStore'
const UpdateRecordButton = ({ path }: { path: string }) => {
  const { recordStatus } = recordListStore()
  return <FaskMakeButton path={path} />
}
export default UpdateRecordButton
