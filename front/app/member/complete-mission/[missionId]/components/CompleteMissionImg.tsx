interface Props {
  src: string
}

const CompleteMissionImg = (props: Props) => {
  return <div className="avatar w-full h-[200px]"><img src={props.src} className="w-full h-[200px]" alt="missionImg" /></div>
}

export default CompleteMissionImg
