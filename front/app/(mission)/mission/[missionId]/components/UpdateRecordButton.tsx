'use client'
import FaskMakeButton from '@/app/components/FastMakeButton'
import { recordListStore } from '@/stores/recordListStore'
const UpdateRecordButton = ({ path }: { path: string }) => {
  const { recordStatus } = recordListStore()
  console.log('레코드버ㅡㄴ', recordStatus)
  return <FaskMakeButton path={path} />
}
export default UpdateRecordButton
