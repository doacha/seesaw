import Image from 'next/image'

interface MemberCard {
  memberNickname: string
  memberImgUrl: string
}

const WaitingMemberCard = ({ data }: { data: MemberCard }) => {
  return (
    <div className="flex flex-row items-center relative">
      <Image
        alt="member profile image"
        // src={data.memberImgUrl}
        src={'/차차_군침이.jpg'}
        width={25}
        height={25}
        className="rounded-full mr-2.5"
      />
      <div className="text-sm">{data.memberNickname}</div>
    </div>
  )
}

const MissionWaitingList = ({ data }: { data?: MemberCard[] }) => {
  return (
    <div className="bg-background m-5 rounded-lg grid grid-cols-2 grid-flow-row p-5 gap-y-2.5 gap-x-5">
      {data &&
        data.map((element) => (
          <WaitingMemberCard data={element} key={element.memberNickname} />
        ))}
    </div>
  )
}
export default MissionWaitingList
