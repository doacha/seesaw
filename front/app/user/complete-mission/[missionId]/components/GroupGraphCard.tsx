import Collapse from '@/app/components/Collapse'
import GroupGraphInfo from './GroupGraphInfo'

const GroupGraphCard = () => {
  return (
    <Collapse
      content={GroupGraphInfo()}
      title={GroupGraphInfo()}
      bgColor="bg-background-fill"
    />
  )
}

export default GroupGraphCard
