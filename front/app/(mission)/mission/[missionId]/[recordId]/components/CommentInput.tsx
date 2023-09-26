import Image from 'next/image'

interface member {
  memberNickname: string
  memberEmail: string
  memberImgUrl: string
}

const CommentInput = (/*{ data }: { data: member }*/) => {
  const data = {
    memberNickname: '도아차차',
    memberEmail: 'doacha@seesaw.com',
    memberImgUrl: '/차차_군침이.jpg',
  }
  return (
    <div className="flex flex-row items-center gap-2.5 mb-5 bg-background rounded-lg h-12 p-5 m-5">
      <Image
        src={data.memberImgUrl}
        alt="member profile image"
        width={27}
        height={26}
        className="rounded-full"
      />
      <div className="flex flex-col flex-[1_1_0%] text-xs">
        {data.memberNickname}
      </div>
      <div className="text-xs flex-[3_1_0%] border-b-[1px] w-full border-black">
        <input
          className="input input-ghost focus:outline-none w-full placeholder:font-scDreamLight p-0 m-0 h-[26px] placeholder:text-xs"
          placeholder="댓글을 작성해주세요."
        />
      </div>
    </div>
  )
}

export default CommentInput
