import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useMutation } from '@tanstack/react-query'
import { commentRefetchStore } from '@/stores/commenRefetch'

const CommentDeleteButton = ({ commentId }: { commentId: number }) => {
  const { mutate } = useMutation(deleteComment)
  const { refetch } = commentRefetchStore()
  const handleDeleteBtn = () => {
    mutate(commentId, {
      onSuccess: (res) => {
        refetch()
      },
      // onError: (err) => console.log('댓글 삭제 에러', err),
    })
  }
  return (
    <FontAwesomeIcon
      icon={faXmark}
      className="absolute right-0 top-1 text-outline"
      onClick={handleDeleteBtn}
    />
  )
}

const deleteComment = async (commentId: number) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/comment/${commentId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    },
  ).then((res) => {
    res
  })
}

export default CommentDeleteButton
