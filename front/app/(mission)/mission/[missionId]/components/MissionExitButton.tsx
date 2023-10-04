'use client'
import Button from '@/app/components/Button'
import { useRef } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

const DUMMY_EMAIL = 'doacha@seesaw.com'

const MissionExitButton = ({ missionId }: { missionId: string }) => {
  const modalRef = useRef<HTMLDialogElement>(null)
  const router = useRouter()
  const { mutate } = useMutation(postQuitMission)
  const handleSubmit = () => {
    mutate(
      { missionId, memberEmail: DUMMY_EMAIL },
      {
        onSuccess: (res) => router.push('/mission-landing'),
      },
    )
  }
  return (
    <div>
      <div className="fixed bottom-[90px] left-[50%] translate-x-[-50%] w-screen px-5">
        <Button
          color="secondary"
          label="미션 참여 취소하기"
          onClick={() => modalRef.current?.showModal()}
        />
        <dialog
          ref={modalRef}
          id="my_modal_6"
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box bg-background">
            <div className="py-7 leading-10">
              입금하신 예치금은{' '}
              <span className="font-scDreamExBold">2~3 영업일 뒤</span>{' '}
              환불됩니다. <br />
              정말 미션 취소하시겠습니까?
            </div>
            <form method="dialog" className="w-full">
              <div className="modal-action">
                {/* if there is a button in form, it will close the modal */}
                <div className="w-full">
                  <button
                    // onClick={() => handleMonthClick(-2)}
                    className="font-scDreamExBold text-[18px] w-full btn btn-outline text-gray outline-transparent min-h-[40px] h-[40px] mb-5 py-0"
                  >
                    돌아가기
                  </button>
                  <Button
                    label="취소한다"
                    color="secondary"
                    onClick={handleSubmit}
                  />
                </div>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  )
}

const postQuitMission = async ({
  missionId,
  memberEmail,
}: {
  missionId: string
  memberEmail: string
}) => {
  return await fetch(`${process.env.NEXT_PUBLIC_SEESAW_API_URL}/mission/quit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      missionId,
      memberEmail,
    }),
  })
}

export default MissionExitButton
