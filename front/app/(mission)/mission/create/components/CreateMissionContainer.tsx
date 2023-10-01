'use client'
import Input from '@/app/components/Input'
import GroupIntroInput from './GroupIntroInput'
import PeriodInput from './PeriodInput'
import CategoryInput from './CategoryInput'
import CycleInput from './CycleInput'
import StartDateInput from './StartDateInput'
import DepositeInput from './DepositInput'
import SelectPublicInput from './SelectPublicInput'
import SelectSavingInput from './SelectSavingInput'
import ImageInput from './ImageInput'
import Button from '@/app/components/Button'
import TargetPriceInput from './TargetPriceInput'
import type { MissionCreate } from '@/app/types'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const DUMMY_EMAIL = 'doacha@seesaw.com'

interface CreateMissionRequest {
  imgFile: File
  missionTitle: string
  missionMaxCount: number
  missionPurpose: string
  missionDeposit: number
  missionIsPublic: boolean
  missionTargetPrice: number
  missionPeriod: number
  missionTotalCycle: number
  missionStartDate: string
  missionHostEmail: string
  missionCategoryId: number
  memberMissionIsSaving: boolean
  [key: string]: any
}

const postNewMission = async (input: FormData) => {
  return await fetch(`${process.env.NEXT_PUBLIC_SEESAW_API_URL}/mission`, {
    method: 'POST',
    body: input,
    headers: {
      // 'Content-Type': 'multipart/form-data',
      // 'Content-Type': 'application/json',
    },
  }).then((res) => {
    let js = res.json()
    console.log('미션 생성 결과', js)
    return js
  })
}

const CreateMissionContainer = () => {
  const [input, setInput] = useState<MissionCreate>({
    imgFile: { id: '', url: '' },
    missionTitle: '', //
    missionMaxCount: 0, //
    missionPurpose: '',
    missionDeposit: 0, //
    missionIsPublic: true, //
    memberMissionSavingMoney: 0, //
    missionPeriod: -1, //
    missionTotalCycle: 0, //
    missionStartDate: { month: -1, day: -1 }, //
    missionHostEmail: DUMMY_EMAIL, // hostemail이 필요가 없네
    missionCategoryId: -1,
    memberMissionIsSaving: true,
  })

  const { mutate, isSuccess } = useMutation(postNewMission)
  const router = useRouter()

  const handleChangeTextInput = (event: any) => {
    const { name, value } = event.target
    setInput({ ...input, [name]: value })
  }

  const handleSubmit = () => {
    input.missionTotalCycle = Math.trunc(
      (input.missionTotalCycle * 7) / input.missionPeriod,
    )
    input.missionMaxCount = Math.trunc(input.missionTotalCycle / 5)
    // 인풋 유효 검사
    // if (isInvalidInput(input)) {
    //   console.log('유효하지 않은 인풋')
    //   return
    // }

    // 제출
    const request: { [key: string]: any } = {}
    for (const value in input) {
      if (value === 'memberMissionIsSaving') continue
      if (value === 'imgFile') continue
      if (value === 'missionStartDate') {
        const currentYear = new Date().getFullYear()
        request[value] =
          currentYear +
          '-' +
          String(input.missionStartDate.month).padStart(2, '0') +
          '-' +
          String(input.missionStartDate.day).padStart(2, '0')
        continue
      }
      request[value] = input[value]
    }
    console.log('리퀘스트체크', request)
    const formData = new FormData()
    if (input.imgFile.file !== undefined) {
      formData.append('image', input.imgFile.file)
    }
    formData.append(
      'createMissionRequest',
      new Blob([JSON.stringify(request)], { type: 'application/json' }),
      // JSON.stringify(request),
    )
    console.log('폼데이타', formData)
    mutate(formData, {
      onSuccess: (res) => router.push(`/mission/${res.missionId}`),
      onError: (err) => console.log('미션 생성 에러\n', err),
    })
  }

  const handleCapsuleClick = (
    idx: number,
    isSelected: boolean,
    type: string,
  ) => {
    if (!isSelected) {
      setInput({ ...input, [type]: idx })
      return
    }
    setInput({ ...input, [type]: -1 })
  }
  return (
    <div className="bg-background rounded-lg flex flex-col gap-5 p-5 mx-5">
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
      <GroupIntroInput state={input} setState={setInput} />
      {/* 미션 카테고리 */}
      <CategoryInput state={input} handleClick={handleCapsuleClick} />
      {/* 미션 빈도 */}
      <PeriodInput state={input} handleClick={handleCapsuleClick} />
      {/* 미션 횟수 */}
      <CycleInput state={input} handleClick={handleCapsuleClick} />
      {/* 시작 날짜 */}
      <StartDateInput state={input} setState={setInput} />
      {/* target price */}
      <TargetPriceInput state={input} setState={setInput} />
      {/* 최소 예치금 */}
      <DepositeInput state={input} setState={setInput} />

      {/* 공개 설정 */}
      <SelectPublicInput state={input} setState={setInput} />
      {/* 적금 설정 */}
      <SelectSavingInput state={input} setState={setInput} />
      {/* 사진 설정 */}
      <ImageInput state={input} setState={setInput} />

      <div className="mt-10 grid grid-cols-2 gap-5">
        <Button color="error" label="취소" onClick={() => {}} />
        <Button color="primary" label="등록하기" onClick={handleSubmit} />
      </div>
    </div>
  )
}

const isInvalidInput = (input: MissionCreate) => {
  for (const property in input) {
    if (property === 'imgFile') continue
    else if (property === 'missionCategoryId' && input[property] === 0) continue
    switch (typeof input[property]) {
      case 'string': {
        if (input[property] === '') return true
        break
      }
      case 'number': {
        if (input[property] <= 0) return true
        break
      }
      default:
        break
    }
  }
  return false
}

export default CreateMissionContainer
