interface Props {
  src: string
}

const CompleteMissionImg = (props: Props) => {
  return <img src={props.src} className="w-full h-[200px]" alt="missionImg" />
}

export default CompleteMissionImg
