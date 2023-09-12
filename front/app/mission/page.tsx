import MissionCard from './components/MissionCard'
import SearchBar from './components/SearchBar'
import SearchContainer from './components/SearchContainer'
import { dummyMissionCard } from './components/dummy'
const page = () => {
  return (
    <div className="bg-background-fill">
      <SearchContainer />
      <div className="flex flex-wrap gap-5 mx-5">
        <MissionCard data={dummyMissionCard} />
        <MissionCard data={dummyMissionCard} />
        <MissionCard data={dummyMissionCard} />
        <MissionCard data={dummyMissionCard} />
        <MissionCard data={dummyMissionCard} />
      </div>
    </div>
  )
}

export default page
