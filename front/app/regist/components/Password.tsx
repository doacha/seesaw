import Input from '@/app/components/Input'
interface PasswordProps {
  onChange: (e: any) => void
  isVaild: boolean
  pw: string
  pwCheck: string
  isPwSame: boolean
}
const Password = ({
  onChange,
  isVaild,
  pw,
  pwCheck,
  isPwSame,
}: PasswordProps) => {
  return (
    <>
      <p className="font-scDreamExBold text-xs justify-start">비밀번호</p>
      <div className="mt-2 mb-7 w-full">
        <Input
          name="pw"
          onChange={onChange}
          type="password"
          placeholder="비밀번호 입력"
          interval="0"
          value={pw}
        />
        {!isVaild && pw.length > 0 && (
          <p className="mt-[2px] mb-1 text-error text-xs">
            * 영문, 숫자, 특수문자 포함 8자리 이상 적어주세요!
          </p>
        )}
        <div className="mt-3 mb-5">
          <Input
            name="pwCheck"
            onChange={onChange}
            type="password"
            placeholder="비밀번호 재입력"
            interval="0"
            value={pwCheck}
          />
          <div className="relative">
            {pwCheck.length > 0 && (
              <p
                className="absolute top-0 left-0 mt-[2px] text-xs"
                style={{ color: !isPwSame ? 'red' : 'green' }}
              >
                {!isPwSame
                  ? '* 비밀번호가 일치하지 않습니다'
                  : '* 비밀번호가 일치합니다'}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Password
