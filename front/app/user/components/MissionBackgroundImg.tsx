interface Props {
  src: string
}

const MissionBackgroundImg = (props: Props) => {
  return (
    <div className="avatar">
      <div className="w-[70px] rounded-lg">
        <img src={props.src} />
      </div>
    </div>
  )
}

export default MissionBackgroundImg
