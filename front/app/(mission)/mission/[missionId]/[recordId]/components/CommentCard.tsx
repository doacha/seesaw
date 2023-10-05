import Image from 'next/image'
import { getTimeBefore } from '../../../../util'
import { Comment } from '@/app/types'
import CommentDeleteButton from './CommentDeleteButton'

const CommentCard = ({
  data,
  loginUser,
}: {
  data: Comment
  loginUser: string
}) => {
  return (
    <div className="flex flex-row items-center gap-2.5 mt-5 relative">
      <Image
        src={data.memberImgUrl ?? '/default_profile.svg'}
        alt="member profile image"
        width={27}
        height={26}
        className="rounded-full self-start mt-2 w-[28px] h-[28px]"
      />
      <div className="w-full">
        <div className="relative w-full">
          <span className="text-xs mr-2 font-scDreamExBold">
            {data.memberNickname}
          </span>
          <span className="text-outline text-[10px]">
            {getTimeBefore(data.commentWriteTime)}
          </span>
          {loginUser === data.memberNickname && (
            <CommentDeleteButton commentId={data.commentId} />
          )}
        </div>
        <div className="text-xs  flex-[3_1_0%]">{data.commentContent}</div>
      </div>
    </div>
  )
}

export default CommentCard
