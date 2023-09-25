'use client'
import Header from '@/app/components/Header'
import CreateMissionContainer from './components/CreateMissionContainer'
const CreatePage = () => {
  return (
    <div className="bg-background-fill py-[84px]">
      <Header title="미션 등록" backButton />
      <CreateMissionContainer />
    </div>
  )
}

export default CreatePage
