'use client'
import Image from 'next/image'
import { useMutation } from '@tanstack/react-query'
import { ChangeEvent, useState } from 'react'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation'
import { commentRefetchStore } from '@/stores/commenRefetch'
import { memberEmailStore } from '@/stores/memberEmail'

interface CommentRequest {
  recordId: number
  commentContent: string
  memberEmail: string
}

const CommentInput = ({ recordId }: { recordId: number }) => {
  const { memberEmail, memberNickname } = memberEmailStore()
  const data = {
    memberNickname: memberNickname,
    memberEmail: memberEmail,
    memberImgUrl: '/차차_군침이.jpg',
  }
  const { refetch } = commentRefetchStore()
  const [commentContent, setCommentContent] = useState('')
  const router = useRouter()
  const { mutate } = useMutation(postComment)
  const handleSubmit = () => {
    const request = {
      recordId,
      commentContent,
      memberEmail: memberEmail,
    }
    mutate(request, {
      onSuccess: (res) => {
        console.log('댓글 등록 결과', res)
        refetch()
      },
      onError: (err) => console.log('댓글 등록 실패', err),
    })
  }
  return (
    <div className="fixed shadow-lg p-5 w-[calc(100vw-40px)] left-5 bottom-[70px] flex flex-row items-center gap-2.5 mb-5 bg-background rounded-lg h-12">
      <div className="flex flex-col flex-[1_1_0%] text-xs">
        {data.memberNickname}
      </div>
      <div className="text-xs flex-[3_1_0%] border-b-[1px] w-full border-black ">
        <input
          className="input input-ghost focus:outline-none w-full placeholder:font-scDreamLight p-0 m-0 h-[26px] placeholder:text-xs"
          placeholder="댓글을 작성해주세요."
          onChange={(e) => setCommentContent(e.target.value)}
          value={commentContent}
        />
      </div>
      <FontAwesomeIcon icon={faPlus} onClick={handleSubmit} className="ml-2" />
    </div>
  )
}
const postComment = async (request: CommentRequest) => {
  return await fetch(`${process.env.NEXT_PUBLIC_SEESAW_API_URL}/comment`, {
    method: 'POST',
    body: JSON.stringify(request),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

const getComments = async (index: number) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/comment/${index}`,
  ).then((res) => {
    let s = res.json()
    return s
  })
}
export default CommentInput
