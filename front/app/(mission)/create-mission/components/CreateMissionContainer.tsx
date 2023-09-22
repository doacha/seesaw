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
import type { MissionCreate } from '@/app/types'
import { MissionCreateDummy } from '@/app/dummies'
import { useState } from 'react'

const CreateMissionContainer = () => {
  const [input, setInput] = useState<MissionCreate>({
    missionTitle: '',
    missionMaxCount: 0,
    missionImgUrl: '',
    missionPurpose: '',
    missionDeposit: 0,
    missionIsPublic: true,
    missionTargetPrice: 0,
    missionPeriod: -1,
    missionTotalCycle: 0,
    missionStartDate: '',
    missionHostEmail: '',
    missionCategoryId: -1,
    memberMissionIsSaving: true,
  })
  console.log('input', input)
  const handleChangeTextInput = (event: any) => {
    const { name, value } = event.target
    setInput({ ...input, [name]: value })
  }

  return (
    <div className="bg-background rounded-lg flex flex-col gap-5 p-5">
      {/* 그룹 이름 */}
      <Input
        type="text"
        label="그룹 이름을 입력해주세요."
        isLabelBig={true}
        placeholder="그룹 이름"
        name="missionTitle"
        onChange={handleChangeTextInput}
        interval="20"
      />
      {/* 그룹 소개글  */}
      <GroupIntroInput name="groupIntro" onChange={() => {}} />
      {/* 미션 카테고리 */}
      <CategoryInput state={input} setState={setInput} />
      {/* 미션 빈도 */}
      <PeriodInput state={input} setState={setInput} />
      {/* 미션 횟수 */}
      <CycleInput state={input} setState={setInput} />
      {/* 시작 날짜 */}
      <StartDateInput state={input} setState={setInput} />
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
