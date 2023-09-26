import Input from '@/app/components/Input'
import ImageUpload from './ImageUpload'
import { useState } from 'react'
import Button from '@/app/components/Button'
import Birth from '@/app/regist/components/Birth'
import { profileEditInfoStore } from '@/stores/profileEditInfo'

interface Props {
  setOpenEditPage: () => void
}

const ProfileEditCard = (props: Props) => {
  const {
    newNickname,
    prevPassword,
    newPassword,
    confirmPassword,
    phoneNumber,
    birth,
    setProfileEditInfo,
    setBirthInfo,
  } = profileEditInfoStore()

  const onInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name, e.target.value)
    setProfileEditInfo(e.target.name, e.target.value)
  }

  const onBirthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthInfo(e)
  }

  const onNicknameCheckClick = () => {}

  const onSubmitButtonClick = () => {}

  return (
    <div className="bg-white rounded-lg p-5 flex flex-col gap-5">
      <ImageUpload />
      <Input
        interval="5"
        placeholder="새로운 닉네임을 입력하세요."
        type="text"
        label="닉네임"
        value={newNickname}
        name="newNickname"
        onChange={onInfoChange}
        submitButton={
          <Button
            color="primary"
            label="중복 확인"
            size="xs"
            onClick={onNicknameCheckClick}
          />
        }
      />
      <div className="flex flex-col gap-4">
        <Input
          interval="5"
          placeholder="기존 비밀번호"
          type="password"
          label="비밀번호"
          value={prevPassword}
          name="prevPassword"
          onChange={onInfoChange}
        />

        <Input
          interval="5"
          placeholder="새 비밀번호"
          type="password"
          value={newPassword}
          name="newPassword"
          onChange={onInfoChange}
        />

        <div>
          <Input
            interval="5"
            placeholder="비밀번호 확인"
            type="password"
            value={confirmPassword}
            name="confirmPassword"
            onChange={onInfoChange}
          />
          {confirmPassword === '' ? null : confirmPassword !== newPassword ? (
            <div className="relative ml-2 mt-1">
              <div className="absolute top-0 text-xs text-error">
                비밀번호가 다릅니다.
              </div>
            </div>
          ) : (
            <div className="relative ml-2 mt-1">
              <div className="absolute top-0 text-xs text-primary">
                비밀번호가 일치합니다!
              </div>
            </div>
          )}
        </div>
        <Input
          interval="5"
          placeholder="전화번호를 입력하세요."
          type="text"
          label="전화번호"
          value={phoneNumber}
          name="phoneNumber"
          onChange={onInfoChange}
        />
        <div>
          <Birth onChange={onBirthChange} />
        </div>
      </div>
      <div className="flex w-full gap-5">
        <div className="flex w-[50%]">
          <Button
            color="error"
            label="취소"
            onClick={props.setOpenEditPage}
          ></Button>
        </div>
        <div className="flex w-[50%]">
          <Button
            color="primary"
            label="수정하기"
            onClick={onSubmitButtonClick}
          ></Button>
        </div>
      </div>
    </div>
  )
}

export default ProfileEditCard
