import Input from '@/app/components/Input'
import Button from '@/app/components/Button'
interface EmailProps {
  onClick: () => void
  onChange: (e: any) => void
}

const Email = ({ onClick, onChange }: EmailProps) => {
  return (
    <>
      <p className="font-scDreamExBold text-xs justify-start">이메일</p>
      <div className="mt-2 mb-5 w-full">
        <div className="grid gap-3 grid-cols-3">
          <div className="col-span-2">
            <Input
              onChange={onChange}
              type="id"
              placeholder="이메일 입력"
              interval="0"
            ></Input>
          </div>
          <div className="col-span-1 my-auto">
            <Button
              color="primary"
              label="인증하기"
              size="xs"
              onClick={onClick}
            ></Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Email
