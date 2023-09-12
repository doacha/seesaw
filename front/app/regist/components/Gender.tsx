interface genderProps {
  onClick: () => void
}

const Gender = ({ onClick }: genderProps) => {
  return (
    <>
      <p className="font-scDreamExBold text-xs justify-start">성별</p>
      <div className="mt-2 mb-5 w-full">
        <div className="grid grid-flow-col gap-2">
          <button
            className="text-outline text-sm hover:text-white border border-outline hover:bg-outline focus:ring-1 focus:outline-none focus:ring-outline rounded-lg px-5 py-2.5 text-center mr-2 mb-2"
            onClick={onClick}
          >
            남자
          </button>
          <button
            className="text-outline text-sm hover:text-white border border-outline hover:bg-outline focus:ring-1 focus:outline-none focus:ring-outline rounded-lg px-5 py-2.5 text-center mr-2 mb-2"
            onClick={onClick}
          >
            여자
          </button>
        </div>
      </div>
    </>
  )
}
export default Gender
