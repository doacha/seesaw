'use client'

import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation'

const Backbutton = () => {
  const router = useRouter()
  return (
    <button
      className="btn btn-ghost normal-case text-xl"
      onClick={() => router.back()}
    >
      <FontAwesomeIcon icon={faChevronLeft} />
    </button>
  )
}

export default Backbutton
