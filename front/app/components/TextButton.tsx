interface Props {
  innerText: string
  textColor: string
  onButtonClick: () => void
}

const TextButton = (props: Props) => {
  return (
    <button className={props.textColor} onClick={props.onButtonClick}>
      {props.innerText}
    </button>
  )
}

export default TextButton
