import Input from '@/app/components/Input'
import type { MissionCreate } from '@/app/types'
import { ChangeEvent } from 'react'
import { useState } from 'react'
const TargetPriceInput = ({
  state,
  setState,
}: {
  state: MissionCreate
  setState: React.Dispatch<React.SetStateAction<MissionCreate>>
}) => {
  const [targetPrice, setTargetPrice] = useState(0)
  const handleDepositeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    if (e.target.value.length > 0 && (isNaN(value) || value < 0)) {
      setTargetPrice(TargetPriceState.INVALID_INPUT_ERROR)
      return
    }
    if (value > 1000 && value % 1000 > 0) {
      setTargetPrice(TargetPriceState.UNIT_ERROR)
      return
    }
    setTargetPrice(TargetPriceState.NORMAL)
    setState({ ...state, missionTargetPrice: value })
  }

  return (
    <div className="relative">
      <div className="absolute top-[84px] text-[10px] text-error">
        {targetPrice === TargetPriceState.INVALID_INPUT_ERROR &&
          '올바른 입력이 아닙니다.'}
        {targetPrice === TargetPriceState.UNIT_ERROR &&
          '1,000원 단위로 입력해주세요.'}
      </div>
      <Input
        type="text"
        label="목표 금액을 설정해주세요."
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

enum TargetPriceState {
  'NORMAL',
  'UNIT_ERROR',
  'INVALID_INPUT_ERROR',
}

export default TargetPriceInput
