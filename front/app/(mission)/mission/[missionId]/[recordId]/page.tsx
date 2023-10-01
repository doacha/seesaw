import CommentsContainer from './components/CommentsContainer'
import RecordContentContainer from './components/RecordContentContainer'
import { Comment } from '@/app/types'
import CommentInput from './components/CommentInput'
interface RecordDetailProps {
  recordId: number
  recordContent: string
  recordWriteTime: string
  recordTotalCost: number
  recordNumber: number
  recordStatus: number
  memberEmail: string
  memberNickname: string
  memberImgUrl: string
}

const RecordIdPage = async ({ params }: { params: any }) => {
  const recordDetail = (await getRecordContent(
    params.recordId,
  )) as RecordDetailProps
  const comments = (await getRecordComments(params.recordId)) as Comment[]
  return (
    <div className="bg-background-fill pt-[68px] min-h-[844px]">
      <RecordContentContainer
        propsData={recordDetail}
        missionId={params.missionId}
      />
      <CommentsContainer propsData={comments} />
      <CommentInput />
    </div>
  )
}

const getRecordContent = async (recordId: number) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/record/${recordId}`,
  ).then((res) => res.json())
}
const getRecordComments = async (recordId: number) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/comment/${recordId}`,
  ).then((res) => res.json())
}
export default RecordIdPage
