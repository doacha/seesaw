import { useState } from 'react'
import Capsule from '@/app/components/Capsule'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const StartDateInput = ({
  name,
  value,
  onChange,
}: {
  name: string
  value?: string
  onChange: any
}) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const month = Array(3).fill(selectedMonth)
  let days = Array(getLastDayOfMonth(selectedMonth))
    .fill(0)
    .map((element, idx) => {
      return String(idx + 1).padStart(2, '0')
    })
  return (
    <div>
      <div className="font-scDreamExBold">시작 날짜를 설정해주세요.</div>
      <span
        onClick={() => {
          ;(
            document.getElementById('monthModal') as HTMLDialogElement | null
          )?.showModal()
        }}
        className="bg-background text-black border-[0.5px] rounded-full border-outline w-[80px] inline-block text-center"
      >
        월
        <FontAwesomeIcon icon={faChevronDown} className="ml-3" />
      </span>
      <span
        onClick={() => {
          ;(
            document.getElementById('cycleModal') as HTMLDialogElement | null
          )?.showModal()
        }}
        className="bg-background text-black border-[0.5px] rounded-full border-outline w-[80px] inline-block text-center"
      >
        일
        <FontAwesomeIcon icon={faChevronDown} className="ml-3" />
      </span>
      <dialog id="monthModal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-background">
          <div className="modal-action">
            {month.map((element, idx) => {
              return <div key={idx}>{element + idx}</div>
            })}
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn bg-transparent border-none text-base">
                취소
              </button>
            </form>
            <div className="flex items-center">
              <button />
            </div>
          </div>
        </div>
      </dialog>
      <dialog id="cycleModal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-background">
          <div className="modal-action">
            <div className=" grid grid-cols-12  gap-2">
              {days.map((element, idx) => {
                return <div key={idx}>{element}</div>
              })}
            </div>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn bg-transparent border-none text-base">
                취소
              </button>
            </form>
            <div className="flex items-center">
              <button />
            </div>
          </div>
        </div>
      </dialog>
      {/* <div>
        <span>월</span>
        <select
          className="select border-outline-container border-1"
          name="year"
          onChange={() => {}}
        >
          {month.map((element, idx) => {
            return <option key={idx}>{element + idx}</option>
          })}
        </select>
      </div>
      <div>
        <span>일</span>
        <select
          className="select border-outline-container border-1"
          name="year"
          onChange={() => {}}
        >
          {days.map((element, idx) => {
            return <option key={idx}>{element}</option>
          })}
        </select>
      </div> */}
    </div>
  )
}

const getLastDayOfMonth = (month: number) => {
  const date = new Date(2023, month, 1) // 현재 날짜
  // 다음 월의 첫 날을 생성한 후, 현재 월의 마지막 날에서 하루를 빼줍니다.
  // date.setMonth(month) // 알고싶은 월 + 1로 설정
  date.setDate(-1) // 해당 월의 -1일로 설정 (setDate는 해당 월의 1일을 기준으로 input값에 따라 조절)
  return date.getDate() + 1
}
export default StartDateInput
