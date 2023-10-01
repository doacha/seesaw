import Button from '@/app/components/Button'
import Input from '@/app/components/Input'

interface nicknameProps {
  checkedNickname: number
  onClick: () => void
  onChange: (e: any) => void
  value: string
}
const Nickname = ({
  checkedNickname,
  onClick,
  onChange,
  value,
}: nicknameProps) => {
  return (
    <>
      <p className="font-scDreamExBold text-xs justify-start">닉네임</p>
      <div className="mt-2 mb-7 w-full">
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
            <div className="relative">
              {value.length > 0 && checkedNickname === 1 && (
                <p className="absolute top-0 left-0 mt-[2px] text-error text-xs">
                  * 이미 사용중인 닉네임입니다!
                </p>
              )}
              {value.length > 0 && checkedNickname === 2 && (
                <p className="absolute top-0 left-0 mt-[2px] text-secondary text-xs">
                  * 사용가능한 닉네임입니다!
                </p>
              )}
            </div>
          </div>
          <div className="col-span-1 my-auto">
            <Button
              color="primary"
              label="중복확인"
              size="xs"
              onClick={() => onClick()}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Nickname
