import Link from 'next/link'
import Card from './components/Card'
import Header from './components/Header'
import Navbar from './components/Navbar'
import Dropdown from './components/Dropdown'

const Entrance = () => {
  return (
    <div className="h-screen w-screen">
      <Header title={'타이틀'} backButton plusButton />
      {/* <Card title={'내 통계'} /> */}
      <div className="flex flex-row-reverse w-24">
        <Dropdown />
      </div>
      <Navbar />
    </div>
  )
}

export default Entrance
