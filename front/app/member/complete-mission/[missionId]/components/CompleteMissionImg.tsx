interface Props {
  src: string
}

const CompleteMissionImg = (props: Props) => {
  console.log('이미지컴포넌트에서 src', props.src)
  return <img src={props.src} className="w-full h-[200px]" alt="missionImg" />
}

export default CompleteMissionImg
