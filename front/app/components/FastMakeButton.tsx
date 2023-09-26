'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation'
const FaskMakeButton = ({
  onClick,
  customCSS,
  path,
}: {
  onClick?: any
  customCSS?: string
  path?: string
}) => {
  const router = useRouter()
  // fast 버튼은 가계부에만 넣는건가?
  return (
    <div
      className="fixed right-[5vw] z-30 bottom-[80px] rounded-full bg-primary-container w-[60px] h-[60px] m-0 flex justify-center items-center drop-shadow-md"
      onClick={onClick}
    >
      <FontAwesomeIcon
        icon={faPlus}
        size="2xl"
        className={`text-background absolute m-auto ${customCSS ?? ''}`}
        onClick={() => router.push(path ?? '/home')}
      />
    </div>
  )
}

export default FaskMakeButton
