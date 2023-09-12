import UserProfileImg from './UserProfileImg'

const user = {
  nickname: '차차아버님',
  imgUrl: './차차_군침이.jpg',
  successCnt: 2,
  failCnt: 3,
}

const UserDetailInfo = () => {
  return (
    <div className="flex gap-2 items-center">
      <UserProfileImg src={user.imgUrl}></UserProfileImg>
      <div className="flex flex-col">
        <div className="text-lg font-extrabold">{user.nickname}</div>
        <div className="text-outline">챌린지 정보</div>
        <div className="text-outline">
          성공 {user.successCnt}회 실패 {user.failCnt}회
        </div>
      </div>
    </div>
  )
}

export default UserDetailInfo
