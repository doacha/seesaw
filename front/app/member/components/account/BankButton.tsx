interface Props {
  bankName: string
  bankImg: string
  selectedBank?: string
  onBankButtonClick?: (value: string) => void
}

const BankButton = (props: Props) => {
  return (
    <div
      className={
        props.onBankButtonClick
          ? props.selectedBank === props.bankName
            ? 'flex items-center gap-2 px-4 py-1 rounded-full bg-primary text-white w-fit'
            : 'flex items-center gap-2 px-4 py-1 rounded-full'
          : 'flex items-center gap-2 py-1 rounded-full'
      }
      onClick={() => {
        props.onBankButtonClick ? props.onBankButtonClick(props.bankName) : null
      }}
    >
      <img className="mask w-[30px] h-[30px]" src={props.bankImg} />
      <div className="font-scDreamLight flex">{props.bankName}</div>
    </div>
  )
}

export default BankButton
