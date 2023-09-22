//Modal.tsx
import React from 'react'
import Button from '@/app/components/Button'

type Props = {
  children?: React.ReactNode
  open: boolean
  handleToggle: () => void
}

const DetailModal = ({ children, open, handleToggle }: Props) => {
  // 클래스 이름을 저장할 빈 문자열을 만듭니다.
  let modalClass = 'modal sm:modal-middle'

  // open 속성이 true인 경우 'modal-open' 클래스를 추가합니다.
  if (open) {
    modalClass += ' modal-open'
  }

  return (
    // we add modal-bottom and modal-middle classes to make it responsive
    //add modal-open for now to test the modal
    <div className={modalClass}>
      {/* we want any content for this modal layout so we just pass the children */}
      <div className="modal-box bg-white">
        <button
          className="btn btn-lg btn-circle btn-ghost absolute right-2 top-2"
          onClick={handleToggle}
        >
          ✕
        </button>
        <h3 className="font-bold text-lg">
          Congratulations random Internet user!
        </h3>
        <p className="py-4">
          You havve been selected for a chance to get one year of subscription
          to use Wikipedia for free!
        </p>
        <div className="flex mt-6 justify-between">
          <div className="w-full grid grid-cols-3 gap-2">
            {/* closes the modal */}
            <div className="col-span-1">
              <Button
                color="error"
                label="삭제"
                size="sm"
                onClick={handleToggle}
              />
            </div>
            <div className="col-span-2">
              <Button
                color="primary"
                label="저장"
                size="sm"
                onClick={handleToggle}
              />
            </div>
            {/* <button className="btn btn-primary" onClick={handleToggle}>
            Yay!
          </button> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailModal
