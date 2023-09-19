interface genderProps {
  onClick: (e: any) => void
  gender: string
}

const Gender = ({ onClick, gender }: genderProps) => {
  return (
    <>
      <p className="font-scDreamExBold text-xs justify-start">성별</p>
      <div className="mt-2 mb-5 w-full">
        <div className="grid grid-flow-col gap-2">
          <button
            className={
              gender === '남자'
                ? 'text-white text-sm text-center ring-1 outline-none bg-outline rounded-lg px-5 py-2.5 mr-2 mb-2'
                : 'text-outline text-sm border border-outline bg-white rounded-lg px-5 py-2.5 text-center mr-2 mb-2'
            }
            onClick={onClick}
            type="button"
            name="gender"
          >
            남자
          </button>
          <button
            className={
              gender === '여자'
                ? 'text-white text-sm text-center ring-1 outline-none bg-outline rounded-lg px-5 py-2.5 mr-2 mb-2'
                : 'text-outline text-sm border border-outline bg-white rounded-lg px-5 py-2.5 text-center mr-2 mb-2'
            }
            onClick={onClick}
            type="button"
            name="gender"
          >
            여자
          </button>
        </div>
      </div>
    </>
  )
}
export default Gender
