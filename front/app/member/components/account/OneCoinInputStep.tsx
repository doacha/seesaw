import Input from '@/app/components/Input'

interface Props {
  authenticationCode: string
  onAuthenticationCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const OneCoinInputStep = (props: Props) => {
  return (
    <div>
      <h3 className="font-bold text-lg mb-5">계좌번호를 입력하세요.</h3>
      <div className="flex flex-col gap-2">
        <div>
          입력하신 계좌로 1원이 입금되었어요.
          <br />
          '시소' 앞 텍스트 네자리를 입력해주세요.
        </div>
        <Input
          interval="5"
          placeholder="네자리 인증코드를 입력하세요."
          type="number"
          value={props.authenticationCode}
          onChange={props.onAuthenticationCodeChange}
        ></Input>
      </div>
    </div>
  )
}

export default OneCoinInputStep
