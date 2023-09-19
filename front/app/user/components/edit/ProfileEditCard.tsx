import Input from '@/app/components/Input'
import ImageUpload from './ImageUpload'
import { useState } from 'react'
import Button from '@/app/components/Button'
import Birth from '@/app/regist/components/Birth'

interface Props {
  setOpenEditPage: () => void
}

const ProfileEditCard = (props: Props) => {
  const [newNickname, setNewNickname] = useState<string>('')
  const [prevPassword, setPrevPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [birth, setBirth] = useState<string[]>([])

  const onNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNickname(e.target.value)
  }

  const onNicknameCheckClick = () => {}

  const onPrevPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrevPassword(e.target.value)
  }

  const onNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value)
  }

  const onConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value)
  }

  const onPhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value)
  }

  const onBirthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.name === 'year') {
      birth.splice(0, 1, e.target.value)
    } else if (e.target.name === 'month') {
      birth.splice(1, 1, e.target.value)
    } else {
      birth.splice(2, 1, e.target.value)
    }
  }

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
        onChange={onNicknameChange}
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
          onChange={onPrevPasswordChange}
        />

        <Input
          interval="5"
          placeholder="새 비밀번호"
          type="password"
          value={newPassword}
          onChange={onNewPasswordChange}
        />

        <div>
          <Input
            interval="5"
            placeholder="비밀번호 확인"
            type="password"
            value={confirmPassword}
            onChange={onConfirmPasswordChange}
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
          onChange={onPhoneNumberChange}
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
