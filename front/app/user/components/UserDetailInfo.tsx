import { User } from '@/app/types'
import UserProfileImg from './UserProfileImg'

interface Props {
  user: User
}

const UserDetailInfo = (props: Props) => {
  return (
    <div className="flex gap-2 items-center">
      <UserProfileImg src={props.user.userImgUrl}></UserProfileImg>
      <div className="flex flex-col">
        <div className="text-lg font-extrabold">{props.user.userNickname}</div>
        <div className="text-outline">챌린지 정보</div>
        <div className="text-outline">
          성공 {props.user.successCnt}회 실패 {props.user.failCnt}회
        </div>
      </div>
    </div>
  )
}

export default UserDetailInfo
