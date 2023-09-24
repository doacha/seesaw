import Input from '@/app/components/Input'
import type { MissionCreate } from '@/app/types'
import { ChangeEvent } from 'react'
import { useState } from 'react'
const DepositeInput = ({
  state,
  setState,
}: {
  state: MissionCreate
  setState: React.Dispatch<React.SetStateAction<MissionCreate>>
}) => {
  const [depositState, setDepositeState] = useState(0)
  const handleDepositeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    if (e.target.value.length > 0 && (isNaN(value) || value < 0)) {
      setDepositeState(DepositeState.INVALID_INPUT_ERROR)
      return
    }
    if (value > MAX_DEPOSITE) {
      setDepositeState(DepositeState.MAX_ERROR)
      return
    }
    if (value > 1000 && value % 1000 > 0) {
      setDepositeState(DepositeState.UNIT_ERROR)
      return
    }
    setDepositeState(DepositeState.NORMAL)
    setState({ ...state, missionDeposit: value })
  }

  return (
    <div className="relative">
      <div className="absolute top-[84px] text-[10px] text-error">
        {depositState === DepositeState.MAX_ERROR &&
          '예치금 최대 금액은 10,000원입니다.'}
        {depositState === DepositeState.INVALID_INPUT_ERROR &&
          '올바른 입력이 아닙니다.'}
        {depositState === DepositeState.UNIT_ERROR &&
          '1,000원 단위로 입력해주세요.'}
      </div>
      <Input
        type="text"
        label="예치금을 설정해주세요."
        isLabelBig={true}
        placeholder="1,000원 단위로 설정해주세요."
        name="missionTitle"
        onChange={handleDepositeChange}
        interval="20"
      />
    </div>
  )
}

const MAX_DEPOSITE = 100000

enum DepositeState {
  'NORMAL',
  'UNIT_ERROR',
  'MAX_ERROR',
  'INVALID_INPUT_ERROR',
}

export default DepositeInput
