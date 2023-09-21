import Input from '@/app/components/Input'
import { mission } from '@/app/dummies'
import CategoryList from '@/app/home/components/CategoryList'
import { missionPeriodArray } from '@/app/lib/constants'
import ToggleCapsule from '@/app/components/ToggleCapsule'
import GroupIntroInput from './GroupIntroInput'
import PeriodInput from './PeriodInput'
import CategoryInput from './CategoryInput'
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
      {/* 시작 날짜 */}
      {/* 최소 예치금 */}
      {/* 공개 설정 */}
      {/* 사진 설정 */}
    </div>
  )
}

export default CreateMissionContainer
