'use client'

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
    <div className="mx-5">
      {label && (
        <label className={`label p-0 ${tailwindLabelInterval}`}>
          <span
            className={`label-text ${tailwindLabelSize} font-scDreamExBold text-black`}
          >
            {label}
          </span>
        </label>
      )}
      <div className="flex w-full">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          className="input flex-3 inline-block input-bordered placeholder:text-xs placeholder:font-scDreamRegular
          input-primary border-outline-container border-1 w-full"
          onChange={onChange}
        />
        {submitButton}
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
