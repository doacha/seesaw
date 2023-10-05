'use client'
import { Comment } from '@/app/types'
import CommentCard from './CommentCard'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { commentRefetchStore } from '@/stores/commenRefetch'

const CommentsContainer = (
  /*{ propsData }: { propsData: Array<Coßment> }*/
  { recordId }: { recordId: number },
) => {
  const { data, refetch } = useQuery<Comment[]>({
    queryKey: ['get-comments', recordId],
    queryFn: () => getRecordComments(recordId),
    staleTime: 10 * 1000,
  })
  const { setRefetch } = commentRefetchStore()
  useEffect(() => {
    setRefetch(refetch)
  }, [])
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
      {data &&
        data.length > 0 &&
        data.map((element) => (
          <CommentCard data={element} key={element.commentId} />
        ))}
      {data && data.length === 0 && (
        <div className="text-center mt-5">
          {' '}
          등록된 댓글이 없습니다.
          <br /> 댓글을 달아주세요!{' '}
        </div>
      )}
    </div>
  )
}

const getRecordComments = async (index: number) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/comment/${index}`,
  ).then((res) => res.json())
}

export default CommentsContainer
