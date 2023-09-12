import Input from '@/app/components/Input'

interface NameProps {
  onChange: (e: any) => void
}

const Name = ({ onChange }: NameProps) => {
  return (
    <>
      <p className="font-scDreamExBold text-xs justify-start">이름</p>
      <div className="mt-3 mb-5">
        <Input
          onChange={onChange}
          type="text"
          placeholder="이름 입력"
          interval="0"
        ></Input>
      </div>
    </>
  )
}

export default Name
