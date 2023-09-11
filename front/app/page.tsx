import Header from './components/Header'
import Navbar from './components/Navbar'
const Entrance = () => {
  const onClick = () => {}
  return (
    <div className="h-screen w-screen">
      <Header title={'타이틀'} backButton plusButton />
      {/* <Card title={'내 통계'} /> */}
      <Navbar />
    </div>
  )
}

export default Entrance
