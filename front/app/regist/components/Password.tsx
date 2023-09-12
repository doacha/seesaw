import Input from '@/app/components/Input'
interface PasswordProps {
  onChange: (e: any) => void
}
const Password = ({ onChange }: PasswordProps) => {
  return (
    <>
      <p className="font-scDreamExBold text-xs justify-start">비밀번호</p>
      <div className="mt-2 mb-5 w-full">
        <Input
          onChange={onChange}
          type="password"
          placeholder="비밀번호 입력"
          interval="0"
        ></Input>
        <div className="mt-3 mb-5">
          <Input
            onChange={onChange}
            type="password"
            placeholder="비밀번호 재입력"
            interval="0"
          ></Input>
        </div>
      </div>
    </>
  )
}

export default Password
