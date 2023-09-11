import Header from '../components/Header'
import Navbar from '../components/Navbar'
import MyMissionListCard from './components/MyMissionListCard'
import UserInfoCard from './components/UserInfoCard'

UserInfoCard

const User = () => {
  return (
    <div className="bg-background-fill flex flex-col h-screen w-screen gap-5">
      <Header title="마이페이지" />
      <div className="mx-5">
        <UserInfoCard />
      </div>
      <div className="mx-5">
        <MyMissionListCard />
      </div>
      <Navbar />
    </div>
  )
}

export default User
