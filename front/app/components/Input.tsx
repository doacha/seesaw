'use client'

////////////////////////////////////////////////////////////////////////////
// 필수 props
// type : 인풋 종류
// label : 라벨 넣을 경우, 라벨 text
// placeholder : 플레이스홀더
// 선택 props
// interval : label과 input 사이 간격, 5px일 경우 '5', '10', '20'의 값을 props로 넘겨줍니다.
// onChange : input에 할당할 change함수
// submitButton : 인증하기 버튼이 필요할 경우, 해당 컴포넌트를 props로 넘겨줍니다.
// isLabelBig : 미션에서만 사용하는 라벨. 라벨 폰트 크기가 큼
// value : 수정에서 초기값 필요할 경우 입력
////////////////////////////////////////////////////////////////////////////

interface inputProps {
  type: string
  label?: string
  isLabelBig?: boolean
  value?: string | number
  placeholder: string | undefined
  interval: string
  onChange?: any
  submitButton?: JSX.Element
}

const Input = ({
  type,
  label,
  value,
  placeholder,
  isLabelBig,
  interval,
  onChange,
  submitButton,
}: inputProps) => {
  const tailwindLabelSize = isLabelBig ? 'text-[16px]' : 'text-[12px]'
  const tailwindLabelInterval = getTailwindScript(interval)
  return (
    <div>
      {label && (
        <label className={`label p-0 ${tailwindLabelInterval}`}>
          <span
            className={`label-text ${tailwindLabelSize} font-scDreamExBold text-black`}
          >
            {label}
          </span>
        </label>
      )}
      <div className="flex w-full gap-2.5">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          className="input flex-[2_1_0%] input-bordered placeholder:text-xs placeholder:font-scDreamRegular
          input-primary border-outline-container border-1 w-full"
          onChange={onChange}
        />
        {submitButton && <div className="flex-[1_1_0%]">{submitButton}</div>}
      </div>
    </div>
  )
}

const getTailwindScript = (interval: string) => {
  switch (Number(interval)) {
    case 5:
      return 'mb-[5px]'
    case 10:
      return 'mb-2.5'
    default:
      return 'mb-5'
  }
}

export default Input
