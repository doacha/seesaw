import Input from '@/app/components/Input'
import type { MissionCreate } from '@/app/types'
import { ChangeEvent } from 'react'
import { useState } from 'react'
const SelectMaxMemberInput = ({
  state,
  setState,
}: {
  state: MissionCreate
  setState: React.Dispatch<React.SetStateAction<MissionCreate>>
}) => {
  const [targetPrice, setTargetPrice] = useState(0)
  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    if (e.target.value.length > 0 && (isNaN(value) || value < 0)) {
      setTargetPrice(TargetPriceState.INVALID_INPUT_ERROR)
      return
    }
    if (value > 99) {
      setTargetPrice(TargetPriceState.UNIT_ERROR)
      return
    }
    setTargetPrice(TargetPriceState.NORMAL)
    setState({ ...state, missionMaxCount: value })
  }

  return (
    <div className="relative">
      <div className="absolute top-[84px] text-[10px] text-error">
        {targetPrice === TargetPriceState.INVALID_INPUT_ERROR &&
          '올바른 입력이 아닙니다.'}
        {targetPrice === TargetPriceState.UNIT_ERROR && '최대 99명 가능합니다.'}
      </div>
      <Input
        type="text"
        label="미션 참여 인원수를 설정해주세요."
        isLabelBig={true}
        placeholder="최대 99명입니다."
        name="memberMissionSavingMoney"
        onChange={handleCountChange}
        interval="20"
      />
    </div>
  )
}

enum TargetPriceState {
  'NORMAL',
  'UNIT_ERROR',
  'INVALID_INPUT_ERROR',
}

export default SelectMaxMemberInput
