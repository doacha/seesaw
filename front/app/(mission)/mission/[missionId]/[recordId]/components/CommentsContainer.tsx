import Image from 'next/image'
import { getTimeBefore } from '../../../../util'
import { Comment } from '@/app/types'
import CommentCard from './CommentCard'
const CommentsContainer = ({ propsData }: { propsData: Array<Comment> }) => {
  return (
    <div className="bg-background rounded-lg p-5 m-5">
      {/* 컨테이너 헤더 */}
      <div className="mb-[15px] flex items-center">
        <span className="mr-2">댓글</span>
        <span className="text-outline text-xs">{propsData.length}</span>
      </div>
      <hr className="border-outline mb-5" />
      {/* 댓글 목록 */}
      {propsData.map((element) => (
        <CommentCard data={element} key={element.commentId} />
      ))}
    </div>
  )
}

export default CommentsContainer
