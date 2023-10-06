import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faShieldHalved } from '@fortawesome/free-solid-svg-icons'
const BrokenShield = ({ isSmall }: { isSmall?: boolean }) => {
  const [xMarkSize, shieldSize, topPosition, margin] = isSmall
    ? ['text-[18px]', 'text-[25px]', 'top-[6.5px]', 'mr-[3px] mb-[3px]']
    : ['text-[40px]', 'text-[60px]', 'bottom-[-4px]', 'mr-2 mb-2']
  return (
    <div className={`relative ${margin}`}>
      <FontAwesomeIcon
        icon={faShieldHalved}
        className={`text-primary ${shieldSize}`}
      />
      <FontAwesomeIcon
        icon={faXmark}
        className={`absolute text-error left-0 ${topPosition} ${xMarkSize}`}
      />
    </div>
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
  const [shieldSize, margin, shileUnit] = isSmall
    ? ['text-[25px]', 'mr-[3px] mb-[3px]', 10]
    : ['text-[60px]', 'mr-2 mb-2', 4]
  const numberOfEmpty = shileUnit - (failureCount % shileUnit)

  return (
    <div className="flex w-full flex-wrap flex-row justify-center my-5 content-end mx-auto">
      {Array(myFailureCount > failureCount ? failureCount : myFailureCount)
        .fill(0)
        .map((element, idx) => (
          <BrokenShield isSmall={isSmall} key={idx} />
        ))}
      {Array(
        failureCount - myFailureCount < 0 ? 0 : failureCount - myFailureCount,
      )
        .fill(0)
        .map((element, idx) => (
          <FontAwesomeIcon
            icon={faShieldHalved}
            className={`${shieldSize} ${margin} text-seesaw-purple-600`}
            key={idx}
          />
        ))}
      {failureCount / shileUnit >= 1 &&
        Array(numberOfEmpty)
          .fill(0)
          .map((element, idx) => (
            <FontAwesomeIcon
              icon={faShieldHalved}
              className={`${shieldSize} ${margin} text-seesaw-purple-600 opacity-0`}
              key={idx}
            />
          ))}
    </div>
  )
}

export default ShieldGroup
