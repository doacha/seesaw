interface Props {
  src: string
}

const UserProfileImg = (props: Props) => {
  return (
    <div>
      <div className="avatar">
        <div className="w-24 rounded-full">
          <img src={props.src} />
        </div>
      </div>
    </div>
  )
}

export default UserProfileImg
