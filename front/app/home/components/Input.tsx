interface Props {
  title: string
  type?: string
  name: string
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}

const Input = ({ title, type, name, value, onChange, placeholder }: Props) => {
  return (
    <div className="w-full flex flex-row gap-1 py-4 border-b-2 border-outline-container">
      <div className="w-28">
        <p className="font-scDreamExBold text-base">{title}</p>
      </div>
      <div className="flex my-auto w-full justify-between">
        <input
          id="small-input"
          type={type}
          name={name}
          value={value || ''}
          onChange={onChange}
          className="w-full mr-5"
          placeholder={placeholder}
        ></input>
      </div>
    </div>
  )
}
export default Input
