import CreateRecordContainer from './components/CreateRecordContainer'
const CreatePage = async ({ params }: { params: any }) => {
  const [recordContent, spendingHistory] = await Promise.all([
    await getRecordContent(params.recordId),
    await getSpendingHistory(params.recordId),
  ])
  return (
    <div className="bg-background-fill pt-16 min-h-[844px]">
      <CreateRecordContainer
        recordId={params.recordId}
        recordContent={recordContent}
        history={spendingHistory}
      />
    </div>
  )
}

const getRecordContent = async (recordId: number) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/record/${recordId}`,
    {
      method: 'GET',
    },
  ).then((res) => {
    return res.json()
  })
}

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

export default CreatePage
