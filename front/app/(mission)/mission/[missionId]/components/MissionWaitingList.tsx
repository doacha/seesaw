import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrown } from '@fortawesome/free-solid-svg-icons'
interface MemberList {
  memberImgUrl: string
  memberName: string
  isHost: boolean
}
const memberListdummy: MemberList[] = Array(10).fill({
  memberImgUrl: '/차차_군침이.jpg',
  memberName: '차차아버님',
  isHost: false,
})

memberListdummy[0].isHost = true

const WaitingMemberCard = ({ data }: { data: MemberList }) => {
  return (
    <div className="flex flex-row items-center relative">
      <Image
        alt="member profile image"
        src={data.memberImgUrl}
        width={25}
        height={25}
        className="rounded-full mr-2.5"
      />
      <div className="text-sm">{data.memberName}</div>
      {data.isHost && (
        <FontAwesomeIcon
          icon={faCrown}
          className="text-primary absolute right-0"
        />
      )}
    </div>
  )
}

const MissionWaitingList = () => {
  return (
    <div className="bg-background m-5 rounded-lg grid grid-cols-2 grid-flow-row p-5 gap-y-2.5 gap-x-5">
      {memberListdummy.map((element, idx) => (
        <WaitingMemberCard data={element} key={element.memberName} />
      ))}
    </div>
  )
}
export default MissionWaitingList
