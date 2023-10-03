import Header from '@/app/components/Header'

const layout = async ({
  children,
  params,
}: {
  children: React.ReactNode
  params: any
}) => {
  const data = await getMissionDetailFetch(params.missionId)
  return (
    <div className="relative h-screen">
      <Header title={`${data.missionTitle}`} backButton />
      {children}
    </div>
  )
}

const getMissionDetailFetch = async (missionId: string) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/mission/detail/${missionId}`,
  ).then((res) => {
    return res.json()
  })
}

export default layout
