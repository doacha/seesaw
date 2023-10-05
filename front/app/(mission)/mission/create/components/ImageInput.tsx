import FileInputButton from './FileInputButton'
import type { MissionCreate } from '@/app/types'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { ImageFile } from '@/app/types'
import Image from 'next/image'
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
      <div className="flex items-center justify-center w-full relative">
        <label
          htmlFor="file"
          className="flex flex-col items-center justify-center w-full h-[205px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          {state.imgFile.url === '' && (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <FontAwesomeIcon icon={faCamera} size="5x" color="#787D85" />
              <p className="my-3 text-sm text-outline">
                <span className="font-scDreamExBold">
                  최대 한장 올릴 수 있습니다
                </span>
              </p>
            </div>
          )}
          <input
            type="file"
            accept="image/jpeg, image/jpg, image/png, image/bmp"
            className="hidden"
            id="file"
            onChange={handleImageChange}
          />
          {state.imgFile.url && (
            <div className="absolute left-[50%] translate-x-[-50%] ">
              <Image
                src={state.imgFile.url}
                width={10}
                height={10}
                alt="그룹 이미지"
                style={{
                  width: '310px',
                  height: '205px',
                  objectFit: 'cover',
                }}
              />
            </div>
          )}
        </label>
      </div>
    </div>
  )
}

export default ImageInput
