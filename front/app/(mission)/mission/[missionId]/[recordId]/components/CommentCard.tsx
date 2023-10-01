import Image from 'next/image'
import { getTimeBefore } from '../../../../util'
import { Comment } from '@/app/types'

const CommentCard = ({ data }: { data: Comment }) => {
  return (
    <div className="flex flex-row items-center gap-2.5 mb-5">
      <Image
        // src={data.memberImgUrl}
        src={'/차차_군침이.jpg'}
        alt="member profile image"
        width={27}
        height={26}
        className="rounded-full"
      />
      <div className="flex flex-col flex-[1_1_0%]">
        <span className="text-xs ">{data.memberNickname}</span>
        <span className="text-outline text-[10px]">
          {getTimeBefore(data.commentWriteTime)}
        </span>
      </div>
      <div className="text-xs  flex-[3_1_0%]">{data.commentContent}</div>
    </div>
  )
}

export default CommentCard
