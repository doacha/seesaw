const GroupIntroInput = ({
  name,
  value,
  onChange,
}: {
  name: string
  value?: string
  onChange: any
}) => {
  return (
    <div>
      <div className="font-scDreamExBold mb-5">그룹 소개글을 작성해주세요.</div>
      <textarea
        className="textarea textarea-primary w-full h-[215px] border-outline-container"
        placeholder="그룹 소개글"
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default GroupIntroInput
