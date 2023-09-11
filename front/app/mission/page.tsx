import MissionCard from './components/MissionCard'
import { dummyMissionCard } from './components/dummy'
const page = () => {
  return (
    <div className="flex flex-wrap gap-5 mx-5">
      <MissionCard data={dummyMissionCard} />
      <MissionCard data={dummyMissionCard} />
      <MissionCard data={dummyMissionCard} />
      <MissionCard data={dummyMissionCard} />
      <MissionCard data={dummyMissionCard} />
    </div>
  )
}

export default page
