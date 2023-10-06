import React, { useEffect, useRef, useState } from 'react'
import { profileEditInfoStore } from '@/stores/profileEditInfo'
import { ImageFile } from '../../../types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'

// interface Props {
//   imageList: ImageFile[]
// }

const ImageUpload = () => {
  // 업로드할 파일들을 담을 State!

  const { newImg, setProfileEditInfo } = profileEditInfoStore()
  const imageInput = useRef<HTMLInputElement>(null)

  const onUploadButtonClicked = () => {
    if (imageInput.current) {
      imageInput.current.click()
    }
  }
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const temp = []
    const imageToAdd = e.target.files
    if (imageToAdd) {
      for (let i = 0; i < imageToAdd.length; i++) {
        const tmpImageFile: ImageFile = {
          id: imageToAdd[i].name,
          file: imageToAdd[i],
          url: URL.createObjectURL(imageToAdd[i]),
        }

        temp.push(tmpImageFile)
      }
      setProfileEditInfo('newImg', temp[0])
    }
  }

  const uploadButton = (
    <div
      className="min-w-[200px] min-h-[200px] bg-background-fill rounded-full flex flex-col justify-center"
      onClick={onUploadButtonClicked}
    >
      <FontAwesomeIcon icon={faPenToSquare} size="xl" />
      <div className="mt-2 text-center font-scDreamMedium">
        프로필 사진 등록
      </div>
    </div>
  )

  const onRemoveButtonClicked = () => {
    setProfileEditInfo('newImg', { id: 'profileImg', url: '' })
  }

  return (
    <>
      <div className="w-full flex overflow-auto justify-center">
        <input
          type="file"
          accept="image/jpg, image/jpeg, image/png"
          multiple
          ref={imageInput}
          style={{ display: 'none' }}
          onChange={(e) => handleImage(e)}
        />
        {newImg.url !== '' ? (
          <div
            key={newImg.url}
            className="relative min-w-[200px] min-h-[200px] bg-gray-100 rounded-full flex flex-col justify-center"
          >
            <div className='avatar w-[200px] h-[200px] rounded-full'>
            <Image src={newImg.url??'./default_profile.svg'} alt={newImg.id} width={200} height={200} className='rounded-full'></Image>
            </div>
            <div
              className="absolute z-10 w-full h-full flex items-center justify-center rounded-full bg-black opacity-0 hover:opacity-30 transition-opacity"
              onClick={onRemoveButtonClicked}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="3em"
                viewBox="0 0 512 512"
                className="fill-white"
              >
                <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
              </svg>
            </div>
          </div>
        ) : null}

        {newImg.url !== '' ? null : uploadButton}
      </div>
    </>
  )
}

export default ImageUpload
