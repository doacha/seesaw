import Input from '@/app/components/Input'
import { mission } from '@/app/dummies'
import CategoryList from '@/app/home/components/CategoryList'
import { missionPeriodArray } from '@/app/lib/constants'
import ToggleCapsule from '@/app/components/ToggleCapsule'
import GroupIntroInput from './GroupIntroInput'
import PeriodInput from './PeriodInput'
import CategoryInput from './CategoryInput'
import CycleInput from './CycleInput'
import StartDateInput from './StartDateInput'
import DepositeInput from './DepositInput'
import SelectPublicInput from './SelectPublicInput'
import ImageInput from './ImageInput'
import Button from '@/app/components/Button'
const CreateMissionContainer = () => {
  return (
    <div className="bg-background rounded-lg flex flex-col gap-5">
      {/* 그룹 이름 */}
      <Input
        type="text"
        label="그룹 이름을 입력해주세요."
        isLabelBig={true}
        placeholder="그룹 이름"
        interval="20"
      />
      {/* 그룹 소개글  */}
      <GroupIntroInput name="groupIntro" onChange={() => {}} />
      {/* 미션 카테고리 */}
      <CategoryInput name="category" onChange={() => {}} />
      {/* 미션 빈도 */}
      <PeriodInput name="period" onChange={() => {}} />
      {/* 미션 횟수 */}
      <CycleInput name="cycle" onChange={() => {}} state={0} />
      {/* 시작 날짜 */}
      <StartDateInput name="startDate" onChange={() => {}} />
      {/* 최소 예치금 */}
      <DepositeInput />
      {/* 공개 설정 */}
      <SelectPublicInput />
      {/* 사진 설정 */}
      <ImageInput />

      <div className="grid grid-cols-2 gap-2">
        <Button color="error" label="취소" onClick={() => {}} />
        <Button color="primary" label="등록하기" onClick={() => {}} />
      </div>
    </div>
  )
}

export default CreateMissionContainer
