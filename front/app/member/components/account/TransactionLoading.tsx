interface Props {
  target: React.RefObject<HTMLDivElement>
}

const TransactionLoading = (props: Props) => {
  return (
    <div className="w-full h-20 flex items-center justify-center" ref={props.target}>
      <span className="loading loading-dots loading-lg text-primary"></span>
    </div>
  )
}

export default TransactionLoading
