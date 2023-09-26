import type { MissionCreate } from '@/app/types'

const GroupIntroInput = ({
  state,
  setState,
}: {
  state: MissionCreate
  setState: React.Dispatch<React.SetStateAction<MissionCreate>>
}) => {
  const handlePuroposeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState({ ...state, missionPurpose: e.target.value })
  }
  return (
    <div>
      <div className="font-scDreamExBold mb-5">그룹 소개글을 작성해주세요.</div>
      <textarea
        className="textarea textarea-primary w-full h-[215px] border-outline-container"
        placeholder="그룹 소개글"
        value={state.missionPurpose}
        onChange={handlePuroposeChange}
      />
    </div>
  )
}

export default GroupIntroInput
