'use client'

import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import Backbutton from './Backbutton'
interface Props {
  title: string
  backButton?: boolean
  plusButton?: boolean
}

const Header = (props: Props) => {
  //add 버그 있음.
  return (
    <div className="navbar bg-white fixed top-0 z-40">
      <div className="flex-1">
        {props.backButton && <Backbutton />}
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
        <Link href="mission/create">
          <div className="flex-none">
            <button className="btn btn-square btn-ghost">
              <FontAwesomeIcon icon={faPlus} size="lg" />
            </button>
          </div>
        </Link>
      ) : null}
    </div>
  )
}

export default Header
