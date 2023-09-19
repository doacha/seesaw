interface Props {
  src: string
}

const UserProfileImg = (props: Props) => {
  return (
    <div className="avatar">
      <div className="w-20 rounded-full">
        <img src={props.src} />
      </div>
    </div>
  )
}

export default UserProfileImg
