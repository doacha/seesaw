import CommentsContainer from './components/CommentsContainer'
import RecordContentContainer from './components/RecordContentContainer'
import CommentInput from './components/CommentInput'

const RecordIdPage = async ({ params }: { params: any }) => {
  const recordDetail = await getRecordContent(params.recordId)
  console.log(recordDetail, params.recordId)
  return (
    <div className="bg-background-fill pt-[68px] min-h-[844px]">
      <RecordContentContainer propsData={recordDetail} />
      <CommentsContainer recordId={params.recordId} />
      <CommentInput recordId={params.recordId} />
    </div>
  )
}
const getRecordContent = async (recordId: number) => {
  console.log('이거왜 언디파인드', recordId)
  return await fetch(
    `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/record/${recordId}`,
    {
      method: 'get',
    },
  ).then((res) => {
    let s = res.json()
    return s
  })
}

export default RecordIdPage
