import Link from 'next/link'
import Card from './components/Card'
import Header from './components/Header'
import Navbar from './components/Navbar'

const Entrance = () => {
  return (
    <div className="h-screen w-screen">
      <Header title={'타이틀'} backButton plusButton />
      {/* <Card title={'내 통계'} /> */}
      <Navbar />
    </div>
  )
}

export default Entrance
