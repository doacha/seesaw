'use client'
import Input from '@/app/components/Input'
import GroupIntroInput from './GroupIntroInput'
import PeriodInput from './PeriodInput'
import CategoryInput from './CategoryInput'
import CycleInput from './CycleInput'
import StartDateInput from './StartDateInput'
import DepositeInput from './DepositInput'
import SelectPublicInput from './SelectPublicInput'
import ImageInput from './ImageInput'
import Button from '@/app/components/Button'
import TargetPriceInput from './TargetPriceInput'
import type { MissionCreate } from '@/app/types'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import SetSaveMoneyModal from '@/app/(mission)/mission//[missionId]/components/SetSaveMoneyModal'
import ConfirmDepositModal from '@/app/(mission)/mission//[missionId]/components/ConfirmDepositModal'
import MoneyTransferModal from '@/app/(mission)/mission//[missionId]/components/MoneyTransferModal'
import { useRef } from 'react'
import { categoryList } from '@/app/lib/constants'
import Swal from 'sweetalert2'
import SelectMaxMemberInput from './SelectMaxMemberInput'
import { memberEmailStore } from '@/stores/memberEmail'
const DUMMY_EMAIL = 'doacha@seesaw.com'
const DUMMY_ACCOUNT_NUM = '457899-01-655239'

interface DepositRequest {
  accountNum: string
  accountTransactionNum: string
  accountApprovalAmount: number
  accountPassword: string
}

const CreateMissionContainer = () => {
  const { memberEmail } = memberEmailStore()
  const [input, setInput] = useState<MissionCreate>({
    imgFile: { id: '', url: '' },
    missionTitle: '', //
    missionMaxCount: 0, //
    missionPurpose: '',
    missionDeposit: 0, //
    missionIsPublic: true, //
    memberMissionSavingMoney: 0, //
    missionPeriod: -1, //
    missionTotalCycle: 0, //
    missionStartDate: { month: -1, day: -1 }, //
    missionHostEmail: memberEmail, // hostemail이 필요가 없네
    missionCategoryId: -1,
    missionTargetPrice: 0,
  })
  const { mutate: submitMissionCreate } = useMutation(postNewMission)
  const { mutate: depositMoney } = useMutation(postDepositMoney)
  const { mutate: categorySpendMoney, data: spendMoney } = useMutation(
    getCategorySpendMoney,
  )
  const router = useRouter()

  const handleChangeTextInput = (event: any) => {
    const { name, value } = event.target
    setInput({ ...input, [name]: value })
  }

  const handleSubmit = () => {
    input.missionTotalCycle = Math.trunc(
      (input.missionTotalCycle * 7) / input.missionPeriod,
    )
    input.missionMaxCount = Math.trunc(input.missionTotalCycle / 5)

    // 제출
    const request: { [key: string]: any } = {}
    for (const value in input) {
      if (value === 'imgFile') continue
      if (value === 'missionStartDate') {
        const currentYear = new Date().getFullYear()
        request[value] =
          currentYear +
          '-' +
          String(input.missionStartDate.month).padStart(2, '0') +
          '-' +
          String(input.missionStartDate.day).padStart(2, '0')
        continue
      }
      request[value] = input[value]
    }
    request.memberMissionSavingMoney = savingMoney
    console.log('리퀘스트체크', request)
    const formData = new FormData()
    if (input.imgFile.file !== undefined) {
      formData.append('image', input.imgFile.file)
    } else {
      console.log('확인완료')
    }
    formData.append(
      'createMissionRequest',
      new Blob([JSON.stringify(request)], { type: 'application/json' }),
      // JSON.stringify(request),
    )
    console.log('폼데이타', formData)
    submitMissionCreate(formData, {
      onSuccess: (res) => router.push(`/mission/${res.missionId}`),
      onError: (err) => console.log('미션 생성 에러\n', err),
    })
  }

  const handleCapsuleClick = (
    idx: number,
    isSelected: boolean,
    type: string,
  ) => {
    if (!isSelected) {
      setInput({ ...input, [type]: idx })
      return
    }
    setInput({ ...input, [type]: -1 })
  }

  const [processLevel, setProcessLevel] = useState(0)
  const [savingMoney, setSavingMoney] = useState(7000)
  const [password, setPassword] = useState<string[]>(['', '', '', ''])
  const refList = [
    useRef<HTMLDialogElement>(null),
    useRef<HTMLDialogElement>(null),
    useRef<HTMLDialogElement>(null),
  ]

  let categorySpendMoneyOrigin = 0
  let categorySpendMoneyData = 0
  const controlSpendMoney = (categoryId: number, memberEmail: string) => {
    categorySpendMoney(
      { categoryId, memberEmail },
      {
        onSuccess: (res) => {
          categorySpendMoneyData = convertMonthlyToUserSet(
            res.average,
            input.missionPeriod,
          )
          setSavingMoney(
            deleteChange(
              categorySpendMoneyData - input.missionTargetPrice > 0
                ? categorySpendMoneyData - input.missionTargetPrice
                : 0,
            ),
          )
        },
      },
    )
  }
  const calculateSavingMoney = (period: number) => {
    const categorySpendMoneyData = convertMonthlyToUserSet(
      spendMoney?.average,
      period,
    )
    setSavingMoney(
      deleteChange(
        categorySpendMoneyData - input.missionTargetPrice > 0
          ? categorySpendMoneyData - input.missionTargetPrice
          : 0,
      ),
    )
  }
  const handleJoinButton = (processLevel: number) => {
    if (processLevel === 2) {
      const depositeRequest = {
        accountTransactionNum: `${process.env.NEXT_PUBLIC_SEESAWBANK_ACCOUNT_NUM}`,
        accountApprovalAmount: input.missionDeposit,
        accountPassword: password.join(''),
        accountNum: DUMMY_ACCOUNT_NUM,
      }
      console.log('예치금요청', depositeRequest)
      depositMoney(depositeRequest, {
        onSuccess: (res) => {
          if (res.status === 500) {
            console.log('에치금입금실패')
            return
          }
          handleSubmit()
        },
        onError: (err) => console.log('예치금입금실패', err),
      })
      return
    }

    if (processLevel === -1 && isInvalidInput(input)) {
      console.log('인풋 망함')
      return
    }
    refList[processLevel + 1].current?.showModal()
  }
  console.log('까보자', spendMoney, categorySpendMoneyOrigin)
  return (
    <div className="bg-background rounded-lg flex flex-col gap-5 p-5 mx-5">
      {/* 그룹 이름 */}
      <Input
        type="text"
        label="그룹 이름을 입력해주세요."
        isLabelBig={true}
        placeholder="그룹 이름"
        name="missionTitle"
        onChange={handleChangeTextInput}
        interval="20"
      />
      {/* 그룹 소개글  */}
      <GroupIntroInput state={input} setState={setInput} />
      {/* 미션 카테고리 */}
      <CategoryInput
        state={input}
        handleClick={handleCapsuleClick}
        getSpendMoney={controlSpendMoney}
        memberEmail={memberEmail}
      />
      {/* 미션 빈도 */}
      <PeriodInput
        state={input}
        handleClick={handleCapsuleClick}
        calculateSavingMoney={calculateSavingMoney}
      />
      {/* 미션 횟수 */}
      <CycleInput state={input} handleClick={handleCapsuleClick} />
      {/* 시작 날짜 */}
      <StartDateInput state={input} setState={setInput} />
      {/* target price */}
      <TargetPriceInput state={input} setState={setInput} />
      {/* 최소 예치금 */}
      <DepositeInput state={input} setState={setInput} />

      {/* 공개 설정 */}
      <SelectPublicInput state={input} setState={setInput} />
      {/* 인원수 설정 */}
      <SelectMaxMemberInput state={input} setState={setInput} />
      {/* 사진 설정 */}
      <ImageInput state={input} setState={setInput} />

      <div className="mt-10 grid grid-cols-2 gap-5">
        <Button color="error" label="취소" onClick={() => {}} />
        <Button
          color="primary"
          label="등록하기"
          onClick={() => handleJoinButton(-1)}
        />
      </div>

      {/* {modalList[processLevel]} */}
      <SetSaveMoneyModal
        setState={setProcessLevel}
        modalRef={refList[0]}
        setSavingMoney={setSavingMoney}
        savingMoney={savingMoney}
        missionCategory={categoryList[input.missionCategoryId]}
        changeModal={handleJoinButton}
        missionTargetPrice={input.missionTargetPrice}
        period={input.missionPeriod}
        spendMoney={Math.trunc(
          ((spendMoney?.average ?? 0) / 30) * input.missionPeriod,
        )}
      />
      <ConfirmDepositModal
        changeModal={handleJoinButton}
        modalRef={refList[1]}
        missionTargetPrice={input.missionTargetPrice}
      />
      <MoneyTransferModal
        changeModal={handleJoinButton}
        modalRef={refList[2]}
        password={password}
        setPassword={setPassword}
        missionTargetPrice={input.missionTargetPrice}
      />
    </div>
  )
}

const postNewMission = async (input: FormData) => {
  return await fetch(`${process.env.NEXT_PUBLIC_SEESAW_API_URL}/mission`, {
    method: 'POST',
    body: input,
  }).then((res) => {
    let js = res.json()
    console.log('미션 생성 결과', js)
    return js
  })
}

const postDepositMoney = async (depositRequset: DepositRequest) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_SEESAW_BANK_API_URL}/account-transactional/transfer`,
    {
      method: 'POST',
      body: JSON.stringify(depositRequset),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  ).then((res) => {
    let js = res.json()
    console.log('입금 결과', js)
    return js
  })
}

const getCategorySpendMoney = async ({
  categoryId,
  memberEmail,
}: {
  categoryId: number
  memberEmail: string
}) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/mission/monthaverage`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        categoryId,
        memberEmail,
      }),
    },
  ).then((res) => res.json())
}

const isInvalidInput = (input: MissionCreate) => {
  for (const property in input) {
    if (property === 'imgFile' && input[property].url === '') {
      getAlert(property)
      return true
    } else if (
      (property === 'missionCategoryId' ||
        property === 'memberMissionSavingMoney') &&
      input[property] === 0
    )
      continue
    else if (
      property === 'missionStartDate' &&
      (input[property].day === -1 || input[property].month === -1)
    ) {
      getAlert(property)
      return true
    }
    switch (typeof input[property]) {
      case 'string': {
        if (input[property] === '') {
          getAlert(property)
          return true
        }
        break
      }
      case 'number': {
        if (input[property] <= 0) {
          getAlert(property)
          return true
        }
        break
      }
      default:
        break
    }
  }
  return false
}

const convertMonthlyToUserSet = (
  spendMoney: number | undefined,
  period: number,
) => {
  if (spendMoney === undefined) return 0
  return Math.trunc((spendMoney / 30) * period)
}

// 1000원단위로 바꿔주기
const deleteChange = (money: number) => {
  if (money === 0) return 0
  let temp = Math.ceil(money / 1000) * 1000
  return temp
}

const alertName: {
  [key: string]: any
} = {
  imgFile: '이미지를',
  missionTitle: '미션 제목을', //
  missionMaxCount: '참가 인원수를', //
  missionPurpose: '미션 소개를',
  missionDeposit: '예치금을', //
  missionIsPublic: '공개여부를', //
  memberMissionSavingMoney: '적금 금액을', //
  missionPeriod: '인증 빈도를', //
  missionTotalCycle: '미션기간을', //
  missionStartDate: '시작날짜를', //
  missionHostEmail: DUMMY_EMAIL, // hostemail이 필요가 없네
  missionCategoryId: '카테고리를',
  missionTargetPrice: '목표 금액을',
}

const getAlert = (property: string) => {
  return Swal.fire({
    width: 300,
    html: `${alertName[property]} 설정해주세요!`,
    icon: 'error',
  })
}

export default CreateMissionContainer
