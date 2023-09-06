import Image from 'next/image'
import Link from 'next/link'

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <Image
          src="/seesaw_logo.svg"
          alt="Seesaw Logo"
          width={100}
          height={24}
          priority
        />
        <Link href={'/home'}>홈</Link>
        <Link href={'/user'}>마이페이지</Link>
      </div>
    </main>
  )
}

export default Home
