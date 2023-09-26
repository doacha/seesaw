import { Member } from '@/app/types'
import MemberProfileImg from './MemberProfileImg'

interface Props {
  member: Member
}

const MemberDetailInfo = (props: Props) => {
  return (
    <div className="flex gap-2 items-center">
      <MemberProfileImg src={props.member.memberImgUrl}></MemberProfileImg>
      <div className="flex flex-col">
        <div className="text-lg font-scDreamExBold mb-1">
          {props.member.memberNickname}
        </div>
        <div className="text-surface font-scDreamMedium">챌린지 정보</div>
        <div className="text-outline flex">
          <div className="text-surface">진행중&nbsp;</div>
          {props.member.ingMissionCnt}회&nbsp;
          <div className="text-primary">성공&nbsp;</div>
          {props.member.successMissionCnt}회&nbsp;
          <div className="text-error">실패&nbsp;</div>
          {props.member.failMissionCnt}회
        </div>
      </div>
    </div>
  )
}

export default MemberDetailInfo
