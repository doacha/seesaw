interface Props {
  src: string
}

const MemberProfileImg = (props: Props) => {
  return (
    <div className="avatar">
      <div className="w-20 rounded-full">
        <img src={props.src} />
      </div>
    </div>
  )
}

export default MemberProfileImg
