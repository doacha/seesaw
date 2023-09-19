import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faShieldHalved } from '@fortawesome/free-solid-svg-icons'
const BrokenShield = ({ isSmall }: { isSmall?: boolean }) => {
  const xMarkSize = isSmall ? 'text-[18px]' : 'text-[40px]'
  const shieldSize = isSmall ? 'text-[25px]' : 'text-[60px]'
  const topPosition = isSmall ? 'top-[6.5px]' : 'top-[1px]'
  return (
    <span className="relative mr-1">
      <FontAwesomeIcon
        icon={faShieldHalved}
        className={`text-primary ${shieldSize}`}
      />
      <FontAwesomeIcon
        icon={faXmark}
        className={`absolute text-error left-0 ${topPosition} ${xMarkSize}`}
      />
    </span>
  )
}

const ShieldGroup = ({
  failureCount,
  myFailureCount,
}: {
  failureCount: number
  myFailureCount: number
}) => {
  const isSmall = failureCount > 8 ? true : false
  const shieldSize = isSmall ? 'text-[25px]' : 'text-[70px]'
  return (
    <div>
      {Array(myFailureCount)
        .fill(0)
        .map((element, idx) => (
          <BrokenShield isSmall={isSmall} key={idx} />
        ))}
      {Array(failureCount - myFailureCount)
        .fill(0)
        .map((element, idx) => (
          <FontAwesomeIcon
            icon={faShieldHalved}
            className={`${shieldSize} mr-1 text-seesaw-purple-600`}
            key={idx}
          />
        ))}
    </div>
  )
}

export default ShieldGroup
