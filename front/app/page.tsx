import Header from './components/Header'
import Navbar from './components/Navbar'
import Dropdown from './components/Dropdown'

const Entrance = () => {
  return (
    <div className="h-screen w-screen">
      <Header title={'타이틀'} backButton plusButton />
      <div></div>
      <Navbar />
    </div>
  )
}

export default Entrance
