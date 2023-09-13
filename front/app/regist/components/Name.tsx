import Input from '@/app/components/Input'

interface NameProps {
  onChange: (e: any) => void
  value: string
}

const Name = ({ onChange, value }: NameProps) => {
  return (
    <>
      <p className="font-scDreamExBold text-xs justify-start">이름</p>
      <div className="mt-3 mb-5">
        <Input
          name="name"
          onChange={onChange}
          type="text"
          placeholder="이름 입력"
          interval="0"
          value={value}
        />
      </div>
    </>
  )
}

export default Name
