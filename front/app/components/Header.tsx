import { faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

interface Props {
  title: string
  backButton?: boolean
  plusButton?: boolean
  route?: string
}

const Header = (props: Props) => {
  //add 버그 있음.
  return (
    <div className="navbar bg-white">
      <div className="flex-1">
        {props.backButton && props.route ? (
          <Link href={props.route}>
            <button className="btn btn-ghost normal-case text-xl">
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
          </Link>
        ) : null}
        <div
          className={
            props.backButton
              ? 'btn btn-ghost normal-case text-2xl font-envR p-0'
              : 'btn btn-ghost normal-case text-2xl font-envR'
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
