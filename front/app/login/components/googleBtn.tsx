import GoogleLogo from '../../../public/btn_google_light_normal_ios.svg'
import Image from 'next/image'

interface GoogleBtnProps {
  onClick?: () => void
}

const GoogleBtn = ({ onClick }: GoogleBtnProps) => {
  return (
    <button
      onClick={onClick}
      className="flex bg-white w-full shadow-lg rounded-lg"
    >
      <Image src={GoogleLogo} alt="Google Logo" />
      <p className="font-robotoM my-auto mx-auto text-lg text-black/50">
        Sign in with Google
      </p>
    </button>
  )
}

export default GoogleBtn
