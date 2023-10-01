'use client'
import { Comment } from '@/app/types'
import CommentCard from './CommentCard'
import { useQuery } from '@tanstack/react-query'

const CommentsContainer = (
  /*{ propsData }: { propsData: Array<Comment> }*/
  { recordId }: { recordId: number },
) => {
  const { data, isSuccess } = useQuery<Comment[]>({
    queryKey: ['get-comments', recordId],
    queryFn: () => getRecordComments(recordId),
    staleTime: 10 * 1000,
  })
  console.log('외않됨', data)
  return (
    <div className="bg-background rounded-lg p-5 m-5">
      {/* 컨테이너 헤더 */}
      <div className="mb-[15px] flex items-center">
        <span className="mr-2">댓글</span>
        <span className="text-outline text-xs">{(data ?? []).length}</span>
      </div>
      <hr className="border-outline" />
      {/* 댓글 목록 */}
      {(data ?? []).map((element) => (
        <CommentCard data={element} key={element.commentId} />
      ))}
    </div>
  )
}

const getRecordComments = async (index: number) => {
  console.log(
    '너냐?',
    `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/comment/${index}`,
  )
  return await fetch(
    `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/comment/${index}`,
  ).then((res) => res.json())
}

export default CommentsContainer
