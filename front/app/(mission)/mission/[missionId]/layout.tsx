import Header from '@/app/components/Header'
import { missionDetailDummy } from '@/app/dummies'
import { useRouter } from 'next/router'
const layout = ({
  children,
  params,
}: {
  children: React.ReactNode
  params: any
}) => {
  return (
    <div className="relative h-screen">
      <Header title={'asdf'} backButton />
      {children}
    </div>
  )
}

export default layout
