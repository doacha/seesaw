interface Props {
  title: string
  name: string
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
}

const TextAreaInput = ({
  title,
  name,
  value,
  onChange,
  placeholder,
}: Props) => {
  return (
    <div className="w-full flex flex-row gap-1 py-4 border-b-2 border-outline-container">
      <div className="w-28">
        <p className="font-scDreamExBold text-base">{title}</p>
      </div>
      <div className="flex my-auto w-full justify-between">
        <textarea
          id="small-input"
          name={name}
          value={value || ''}
          onChange={onChange}
          className="w-full mr-5"
          placeholder={placeholder}
        ></textarea>
      </div>
    </div>
  )
}
export default TextAreaInput
