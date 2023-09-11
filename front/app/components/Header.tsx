import { faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

interface Props {
  title: String
  backButton: boolean
  plusButton: boolean
}

const Header = (props: Props) => {
  //add 버그 있음.
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        {props.backButton ? (
          <Link href={'/main'}>
            <button className="btn btn-ghost normal-case text-xl">
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
          </Link>
        ) : null}
        <div
          className={
            props.backButton
              ? 'btn btn-ghost normal-case text-xl font-envR p-0'
              : 'btn btn-ghost normal-case text-xl font-envR'
          }
        >
          {props.title}
        </div>
      </div>
      {props.plusButton ? (
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <FontAwesomeIcon icon={faPlus} size="lg" />
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default Header
