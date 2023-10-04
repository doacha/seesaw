import Image from 'next/image'

interface MemberCard {
  memberNickname: string
  memberImgUrl: string
}

const WaitingMemberCard = ({ data }: { data: MemberCard }) => {
  return (
    <div className="flex flex-row items-center relative">
      <div className="relative w-[25px] h-[25px] rounded-ful mr-2">
        <Image
          alt="member profile image"
          src={data.memberImgUrl ?? '/default_profile.svg'}
          width={25}
          height={25}
          className="rounded-full mr-2.5 absolute top-[50%] translate-y-[-50%]"
        />
      </div>
      <div className="text-sm">{data.memberNickname}</div>
    </div>
  )
}

const MissionWaitingList = ({ data }: { data?: MemberCard[] }) => {
  return (
    <div className="bg-background m-5 rounded-lg grid grid-cols-2 grid-flow-row p-5 gap-y-2.5 gap-x-5">
      {data &&
        data.length > 0 &&
        data.map((element) => (
          <WaitingMemberCard data={element} key={element.memberNickname} />
        ))}
    </div>
  )
}
export default MissionWaitingList
