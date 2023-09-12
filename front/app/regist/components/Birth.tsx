import { YEAR, MONTH, DAY } from './constants'

interface BirthProps {
  onChange: (e: any) => void
}
const Birth = ({ onChange }: BirthProps) => {
  return (
    <>
      {/* 생년월일 입력 */}
      <p className="font-scDreamExBold text-xs justify-start">생년월일</p>
      <div className="grid grid-flow-col mt-2 mb-5 gap-2">
        <select
          className="select border-outline-container border-1"
          name="year"
          onChange={onChange}
        >
          {YEAR.map((y) => {
            return <option key={y}>{y}</option>
          })}
        </select>
        <select
          className="select border-outline-container border-1"
          name="month"
          onChange={onChange}
        >
          {MONTH.map((m) => {
            return <option key={m}>{m}</option>
          })}
        </select>
        <select
          className="select border-outline-container border-1"
          name="day"
          onChange={onChange}
        >
          {DAY.map((d) => {
            return <option key={d}>{d}</option>
          })}
        </select>
      </div>
    </>
  )
}

export default Birth
