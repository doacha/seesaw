'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'

const CopyToClipboardButton = ({ url }: { url: string }) => {
  const handleCopyToClipBoard = () => {
    navigator.clipboard.writeText(
      `http://j9a409.p.ssafy.io:3000/mission/${url}`,
    )
  }

  return (
    <div
      className="bg-primary rounded-full px-2 py-1"
      onClick={handleCopyToClipBoard}
    >
      <FontAwesomeIcon
        icon={faArrowUpRightFromSquare}
        className="text-background"
      />
    </div>
  )
}

export default CopyToClipboardButton
