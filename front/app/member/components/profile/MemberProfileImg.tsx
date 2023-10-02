import Image from "next/image"

interface Props {
  src: string
}

const MemberProfileImg = (props: Props) => {
  return (
    <div className="avatar">
      <div className="w-16 rounded-full">
        <Image src={props.src} alt="profileImg" width={64} height={64}></Image>
      </div>
    </div>
  )
}

export default MemberProfileImg
