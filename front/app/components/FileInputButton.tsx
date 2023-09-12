'use client'

import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

const FileInputButton = () => {
  const [image, setImage] = useState<string>()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const file = e.target.files?.[0]
    console.log(file)
    if (file) {
      const image = window.URL.createObjectURL(file)
      console.log(image)
      setImage(image)
    }
  }

  return (
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
  )
}

export default FileInputButton
