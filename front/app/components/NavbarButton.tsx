'use client'
import { faWallet, faFlag, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
  icon: string
  activated: boolean
  onTabClick: () => void
}

const NavbarButton = (props: Props) => {
  return (
    <button
      onClick={props.onTabClick}
      className={props.activated ? 'border-t-2 border-primary' : ''}
    >
      {props.icon === 'wallet' ? (
        <div className="flex flex-col items-center">
          <FontAwesomeIcon
            icon={faWallet}
            size="xl"
            className={props.activated ? 'text-primary' : ''}
          />
          <div
            className={
              props.activated ? 'text-xs mt-1 text-primary' : 'text-xs mt-1'
            }
          >
            가계부
          </div>
        </div>
      ) : props.icon === 'flag' ? (
        <div className="flex flex-col items-center">
          <FontAwesomeIcon
            icon={faFlag}
            size="xl"
            className={props.activated ? 'text-primary' : ''}
          />
          <div
            className={
              props.activated ? 'text-xs mt-1 text-primary' : 'text-xs mt-1'
            }
          >
            미션
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <FontAwesomeIcon
            icon={faUser}
            size="xl"
            className={props.activated ? 'text-primary' : ''}
          />
          <div
            className={
              props.activated ? 'text-xs mt-1 text-primary' : 'text-xs mt-1'
            }
          >
            마이페이지
          </div>
        </div>
      )}
    </button>
  )
}

export default NavbarButton
