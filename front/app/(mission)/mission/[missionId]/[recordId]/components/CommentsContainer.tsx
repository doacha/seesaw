import Image from 'next/image'
import { getTimeBefore } from '../../util'
import CommentCard from './CommentCard'
interface Comment {
  commentId: number
  commentContent: string
  memberNickname: string
  memberEmail: string
  memberImgUrl: string
  commentWriteTime: string
}
const dummy = [
  {
    commentId: 1,
    commentContent:
      '댓글을 써보자댓글을 써보자댓글을 써보자댓글을 써보자댓글을 써보자댓글을 써보자',
    memberNickname: '도아차차',
    memberEmail: 'doacha@seesaw.com',
    memberImgUrl: '/차차_군침이.jpg',
    commentWriteTime: '2023-09-12T15:07:52.000+00:00',
  },
  {
    commentId: 2,
    commentContent: '댓글 테스트',
    memberNickname: '도아차차',
    memberEmail: 'doacha@seesaw.com',
    memberImgUrl: '/차차_군침이.jpg',
    commentWriteTime: '2023-09-12T15:17:38.000+00:00',
  },
]

const CommentsContainer = (/*{data} : {data: Array<Comment>}*/) => {
  const data = dummy
  return (
    <div className="bg-background rounded-lg p-5 m-5">
      {/* 컨테이너 헤더 */}
      <div className="mb-[15px] flex items-center">
        <span className="mr-2">댓글</span>
        <span className="text-outline text-xs">{data.length}</span>
      </div>
      <hr className="border-outline mb-5" />
      {/* 댓글 목록 */}
      {data.map((element) => (
        <CommentCard data={element} key={element.commentId} />
      ))}
    </div>
  )
}

export default CommentsContainer
