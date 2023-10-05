import { useState } from 'react'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '@/app/components/Button'
import { MissionCreate } from '@/app/types'
const StartDateInput = ({
  state,
  setState,
}: {
  state: MissionCreate
  setState: React.Dispatch<React.SetStateAction<MissionCreate>>
}) => {
  // const [selectedMonth, setSelectedMonth] = useState(-1)
  // const [selectedDay, setSelectedDay] = useState(-1)
  const [isDateCorrect, setIsDateCorrect] = useState(true)
  const month = Array(3).fill(currentMonth)
  const selectedDay = state.missionStartDate.day
  const selectedMonth = state.missionStartDate.month
  let days = Array(getLastDayOfMonth(selectedMonth))
    .fill(0)
    .map((element, idx) => {
      return String(idx + 1).padStart(2, '0')
    })

  const handleMonthClick = (month: number) => {
    // console.log('엥', state)
    const newState = {
      ...state,
      missionStartDate: { ...state.missionStartDate },
    }
    if (month + 1 === newState.missionStartDate.month) {
      // 재클릭 시 비활성화
      newState.missionStartDate.month = -1
      setState(newState)
      return
    }
    newState.missionStartDate.month = month + 1 // 월 설정

    if (checkDateCorrect(month + 1, newState.missionStartDate.day)) {
      // 일 설정된 상태에서 월 바꿨을때 과거날짜면 일 해제
      newState.missionStartDate.day = -1
    }

    setState(newState)
  }

  const handleDayClick = (day: number) => {
    const newState = {
      ...state,
      missionStartDate: { ...state.missionStartDate },
    }

    if (day + 1 === selectedDay) {
      // 이미 선택한 day 비활성화
      newState.missionStartDate.day = -1
      setState(newState)
      return
    }

    if (day !== -2 && checkDateCorrect(selectedMonth, day + 1)) {
      // 취소가 아니면서 과거 선택시
      setIsDateCorrect(false)
      return
    }

    setIsDateCorrect(true) // 정상선택이므로 안내문구 비활성화
    newState.missionStartDate.day = day + 1
    if (selectedMonth === -1) {
      newState.missionStartDate.month = currentMonth + 1
    }
    setState(newState)
  }
  // const handleSubmitDate = () => {
  //   setState({ ...state, missionStartDate: getSelectedDate() })
  // }
  const getSelectedDate = () => {
    return (
      currentYear +
      '-' +
      String(selectedMonth).padStart(2, '0') +
      '-' +
      String(selectedDay).padStart(2, '0')
    )
  }
  return (
    <div>
      <div className="font-scDreamExBold mb-5">시작 날짜를 설정해주세요.</div>
      {/* 월 선택 버튼 */}
      <span
        onClick={() => {
          ;(
            document.getElementById('monthModal') as HTMLDialogElement | null
          )?.showModal()
        }}
        className="bg-background mr-2.5 h-[30px] leading-[29px] text-black border-[0.5px] rounded-full border-outline w-[80px] inline-block text-center"
      >
        {selectedMonth === -1 ? '' : selectedMonth}월
        <FontAwesomeIcon icon={faChevronDown} className="ml-3" />
      </span>
      {/* 일 선택 버튼 */}
      <span
        onClick={() => {
          ;(
            document.getElementById('cycleModal') as HTMLDialogElement | null
          )?.showModal()
        }}
        className="bg-background h-[30px] leading-[29px] text-black border-[0.5px] rounded-full border-outline w-[80px] inline-block text-center"
      >
        {selectedDay === -1 ? '' : selectedDay}일
        <FontAwesomeIcon icon={faChevronDown} className="ml-3" />
      </span>
      {/* 월 모달 */}
      <dialog id="monthModal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-background">
          <div className="font-scDreamMedium mb-5">월 선택</div>
          <div className="flex justify-between">
            {month.map((element, idx) => (
              <div
                className={`w-full text-center ${
                  selectedMonth === element + idx + 1
                    ? 'text-primary'
                    : 'text-black'
                }`}
                key={idx}
                onClick={() => handleMonthClick(element + idx)}
              >
                {element + idx + 1}월
              </div>
            ))}
          </div>
          <div className="modal-action">
            <form method="dialog" className="w-full">
              {/* if there is a button in form, it will close the modal */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  // onClick={() => handleMonthClick(-2)}
                  className="font-scDreamExBold text-[18px] text-gray leading-10 outline-transparent text-center"
                >
                  취소
                </button>
                <Button
                  color="primary"
                  label="확인"
                  onClick={() => {}}
                  size="lg"
                  disabled={selectedMonth === -1 ? true : false}
                />
              </div>
            </form>
          </div>
        </div>
      </dialog>
      {/* 일 모달 */}
      <dialog id="cycleModal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-background">
          <div className="flex justify-between">
            <span className="font-scDreamMedium mb-5">
              {selectedMonth === -1 ? currentMonth + 1 : selectedMonth}월
              {selectedDay > 0 && ` ${selectedDay}일`}
            </span>
            {!isDateCorrect && (
              <span className="text-error">미래 날짜를 선택해주세요.</span>
            )}
          </div>
          <div className=" grid grid-cols-12  gap-2">
            {days.map((element, idx) => (
              <div
                className={`${
                  selectedDay === idx + 1
                    ? 'text-primary'
                    : checkDateCorrect(selectedMonth, idx + 1)
                    ? 'text-gray'
                    : 'text-black'
                }`}
                key={idx}
                onClick={() => handleDayClick(idx)}
              >
                {element}
              </div>
            ))}
          </div>
          <div className="modal-action w-full">
            <form method="dialog" className="w-full">
              {/* if there is a button in form, it will close the modal */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  // onClick={() => handleDayClick(-2)}
                  className="font-scDreamExBold text-[18px] outline-transparent text-gray leading-10 text-center"
                >
                  취소
                </button>
                <Button
                  color="primary"
                  label="확인"
                  onClick={() => {}}
                  size="lg"
                  disabled={selectedDay === -1 ? true : false}
                />
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}
const current = new Date()
const currentYear = current.getFullYear()
const currentMonth = current.getMonth()
const getLastDayOfMonth = (month: number) => {
  const date = new Date(currentYear, month, 1) // 현재 날짜
  // 다음 월의 첫 날을 생성한 후, 현재 월의 마지막 날에서 하루를 빼줍니다.
  // date.setMonth(month) // 알고싶은 월 + 1로 설정
  date.setDate(-1) // 해당 월의 -1일로 설정 (setDate는 해당 월의 1일을 기준으로 input값에 따라 조절)
  return date.getDate() + 1
}
const checkDateCorrect = (month: number, day: number) => {
  const targetDate = new Date(
    currentYear,
    month === -1 ? currentMonth : month - 1,
    day,
  )
  return current.getTime() >= targetDate.getTime()
}
export default StartDateInput
