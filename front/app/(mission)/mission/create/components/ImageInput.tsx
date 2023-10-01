import FileInputButton from './FileInputButton'
import type { MissionCreate } from '@/app/types'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { ImageFile } from '@/app/types'
const ImageInput = ({
  state,
  setState,
}: {
  state: MissionCreate
  setState: React.Dispatch<React.SetStateAction<MissionCreate>>
}) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const uploadFile = e.target.files?.[0]
    if (uploadFile) {
      const fileForUpload: ImageFile = {
        id: uploadFile.name,
        file: uploadFile,
        url: URL.createObjectURL(uploadFile),
      }
      setState({ ...state, imgFile: fileForUpload })
    }
  }
  return (
    <div>
      <div className="font-scDreamExBold mb-5">
        그룹 사진을 설정해보시겠어요?
      </div>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <FontAwesomeIcon icon={faCamera} size="5x" color="#787D85" />
            <p className="my-3 text-sm text-outline">
              <span className="font-scDreamExBold">
                최대 한장 올릴 수 있습니다
              </span>
            </p>
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="file"
            onChange={handleImageChange}
          />
        </label>
        {/* 이미지 미리보기
      {image && (
        <div className="mt-4">
          <img src={image} alt="Uploaded" width="200" />
        </div>
      )} */}
      </div>
    </div>
  )
}

export default ImageInput
