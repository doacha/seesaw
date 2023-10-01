import Image from "next/image"

interface Props {
  src: string
}

const MemberProfileImg = (props: Props) => {
  return (
    <div className="avatar">
      <div className="w-20 rounded-full">
        <Image src={props.src} alt="profileImg" width={80} height={80}></Image>
      </div>
    </div>
  )
}

export default MemberProfileImg
