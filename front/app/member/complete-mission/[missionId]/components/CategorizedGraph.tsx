import HorizontalGarphBar from '@/app/components/HorizontalGraphBar'
import { categoryIcon, categoryList, iconColors } from '@/app/lib/constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
  category: number
  group: number
  me: number
  highlight?: 'most' | 'least' | ''
}

const CategorizedGraph = (props: Props) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex font-scDreamMedium text-lg items-center gap-2">
        <FontAwesomeIcon
          icon={categoryIcon[props.category]}
          style={{ color: iconColors[props.category] }}
        />
        {categoryList[props.category]}
      </div>
      <div>
        <HorizontalGarphBar
          height="small"
          amount={Math.round(props.group)}
          length={`${props.group * 5}px`}
          title="그룹"
          bgColor={
            props.highlight === 'most'
              ? 'bg-error-container'
              : props.highlight === 'least'
              ? 'bg-primary-container'
              : 'bg-outline-container'
          }
          txtColor="text-surface"
          unitType="percent"
        ></HorizontalGarphBar>
        <HorizontalGarphBar
          height="small"
          amount={Math.round(props.me)}
          length={`${props.me * 5}px`}
          title="나"
          bgColor={
            props.highlight === 'most'
              ? 'bg-error'
              : props.highlight === 'least'
              ? 'bg-primary'
              : 'bg-outline'
          }
          txtColor={
            props.highlight === 'most'
              ? 'text-error'
              : props.highlight === 'least'
              ? 'text-primary'
              : 'text-surface'
          }
          unitType="percent"
        ></HorizontalGarphBar>
      </div>
    </div>
  )
}

export default CategorizedGraph
