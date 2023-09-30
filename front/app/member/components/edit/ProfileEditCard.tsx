import Input from '@/app/components/Input'
import ImageUpload from './ImageUpload'
import { useState } from 'react'
import Button from '@/app/components/Button'
import Birth from '@/app/regist/components/Birth'
import { profileEditInfoStore } from '@/stores/profileEditInfo'

interface Props {
  setOpenEditPage: () => void
  handleModalClick: (e: React.MouseEvent) => void
}

const ProfileEditCard = (props: Props) => {
  const [nicknameChecked, setNicknameChecked] = useState<number>(0)

  const {
    newNickname,
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
    <div
      className="bg-white rounded-lg p-5 flex flex-col gap-5"
      onClick={props.handleModalClick}
    >
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
      {nicknameChecked === 0 ? null : nicknameChecked === 1 ? (
        <div className="relative ml-2 mt-1">
          <div className="absolute top-0 text-xs text-primary">
            사용 가능한 닉네임입니다.
          </div>
        </div>
      ) : (
        <div className="relative ml-2 mt-1">
          <div className="absolute top-0 text-xs text-error">
            이미 존재하는 닉네임입니다.
          </div>
        </div>
      )}
      <div className="flex flex-col gap-4">
        <Input
          label="비밀번호"
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
          <Birth onChange={onBirthChange} birth={birth} />
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
            disabled={
              confirmPassword !== newPassword ||
              confirmPassword === '' ||
              nicknameChecked !== 1
                ? true
                : false
            }
          ></Button>
        </div>
      </div>
    </div>
  )
}

export default ProfileEditCard
