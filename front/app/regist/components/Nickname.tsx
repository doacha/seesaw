import Button from '@/app/components/Button'
import Input from '@/app/components/Input'

interface nicknameProps {
  onClick: () => void
  onChange: (e: any) => void
  value: string
}
const Nickname = ({ onClick, onChange, value }: nicknameProps) => {
  return (
    <>
      <p className="font-scDreamExBold text-xs justify-start">닉네임</p>
      <div className="mt-2 mb-5 w-full">
        <div className="grid gap-3 grid-cols-3">
          <div className="col-span-2">
            <Input
              name="nickname"
              onChange={onChange}
              type="text"
              placeholder="닉네임 입력"
              interval="0"
              value={value}
            />
          </div>
          <div className="col-span-1 my-auto">
            <Button
              color="primary"
              label="중복확인"
              size="xs"
              onClick={onClick}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Nickname
