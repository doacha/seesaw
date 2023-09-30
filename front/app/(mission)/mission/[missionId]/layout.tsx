import Header from '@/app/components/Header'
import { missionDetailDummy } from '@/app/dummies'
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header title={missionDetailDummy.missionTitle} backButton />
      {children}
    </div>
  )
}

export default layout
