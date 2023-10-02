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
  // const [recordDetail, comments] = await Promise.all([
  //   getRecordContent(params.recordId),
  //   getRecordComments(2),
  // ])
  const recordDetail = await getRecordContent(params.recordId)
  return (
    <div className="bg-background-fill pt-[68px] min-h-[844px]">
      <RecordContentContainer propsData={recordDetail} />
      <CommentsContainer recordId={params.recordId} />
      <CommentInput recordId={params.recordId} />
    </div>
  )
}
const getRecordContent = async (recordId: number) => {
  console.log(
    '비교군',
    `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/record/${recordId}`,
  )
  return await fetch(
    `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/record/${recordId}`,
  ).then((res) => {
    let s = res.json()
    return s
  })
}

// const getRecordComments = async (index: number) => {
//   console.log(
//     '너냐?',
//     `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/comment/${index}`,
//   )
//   return await fetch(
//     `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/comment/${index}`,
//   ).then((res) => res.json())
// }

export default RecordIdPage
