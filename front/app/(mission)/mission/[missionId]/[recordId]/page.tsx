import CommentsContainer from './components/CommentsContainer'
import RecordContentContainer from './components/RecordContentContainer'
import CommentInput from './components/CommentInput'

const RecordIdPage = async ({ params }: { params: any }) => {
  // const [recordDetail, spendingHistory] = await Promise.all([
  //   getRecordContent(params.recordId),
  //   getSpendingHistory(params.recordId),
  // ])
  const spendingHistory = await getSpendingHistory(params.recordId)

  return (
    <div className="bg-background-fill pt-[68px] min-h-[844px]">
      <RecordContentContainer
        recordId={params.recordId}
        spendingHistory={spendingHistory}
      />
      <CommentsContainer recordId={params.recordId} />
      <CommentInput recordId={params.recordId} />
    </div>
  )
}

// const getRecordContent = async (recordId: number) => {
//   console.log('이거왜 언디파인드', recordId)
//   return await fetch(
//     `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/record/${recordId}`,
//     {
//       method: 'get',
//     },
//   ).then((res) => {
//     let s = res.json()
//     return s
//   })
// }

const getSpendingHistory = async (recordId: number) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/spending/record/${recordId}`,
    {
      method: 'get',
    },
  ).then((res) => {
    let s = res.json()
    return s
  })
}

export default RecordIdPage
