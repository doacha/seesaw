interface Props {
  bankName: string
  bankImg: string
  selectedBank: string
  onBankButtonClick: (value: string) => void
}

const BankSelect = (props: Props) => {
  return (
    <div
      className={
        props.selectedBank === props.bankName
          ? 'flex items-center gap-2 px-3 rounded-full bg-primary text-white'
          : 'flex items-center gap-2'
      }
      onClick={() => props.onBankButtonClick(props.bankName)}
    >
      <img className="mask w-[30px] h-[30px]" src={props.bankImg} />
      <div className="font-scDreamLight">{props.bankName}</div>
    </div>
  )
}

export default BankSelect
