import Input from '@/app/components/Input'
import Button from '@/app/components/Button'
interface EmailProps {
  checkedEmail: number
  onClick: () => void
  onChange: (e: any) => void
  isVaild: boolean
  value: string
}

const Email = ({
  checkedEmail,
  onClick,
  onChange,
  isVaild,
  value,
}: EmailProps) => {
  return (
    <>
      <p className="font-scDreamExBold text-xs justify-start">이메일</p>
      <div className="mt-2 mb-7 w-full">
        <div className="grid gap-3 grid-cols-3">
          <div className="col-span-2">
            <Input
              name="email"
              onChange={onChange}
              type="id"
              placeholder="이메일 입력"
              interval="0"
              value={value}
            />
            <div className="relative">
              {!isVaild && value.length > 0 && checkedEmail == 0 && (
                <p className="absolute top-0 left-0 mt-[2px] text-error text-xs">
                  * 이메일 양식을 맞춰주세요!
                </p>
              )}
              {isVaild && value.length > 0 && checkedEmail === 1 && (
                <p className="absolute top-0 left-0 mt-[2px] text-error text-xs">
                  * 이미 사용중인 이메일입니다!
                </p>
              )}
              {isVaild && value.length > 0 && checkedEmail === 2 && (
                <p className="absolute top-0 left-0 mt-[2px] text-green-500 text-xs">
                  * 사용가능한 이메일입니다!
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

export default Email
