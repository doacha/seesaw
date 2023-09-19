import { useState } from 'react'
import BankSelect from './BankSelect'
import RegistButton from './OpenModalButton'
import Button from '@/app/components/Button'

const bankList = [
  { bankName: '시소은행', bankImg: './seesaw_logo.svg' },
  { bankName: '신한은행', bankImg: './seesaw_logo.svg' },
  { bankName: '국민은행', bankImg: './seesaw_logo.svg' },
  { bankName: '우리은행', bankImg: './seesaw_logo.svg' },
]

const bankList2 = [
  { bankName: '봉준은행', bankImg: './seesaw_logo.svg' },
  { bankName: '재웅은행', bankImg: './seesaw_logo.svg' },
  { bankName: '경호은행', bankImg: './seesaw_logo.svg' },
  { bankName: '시원은행', bankImg: './seesaw_logo.svg' },
]

const AccountRegistModal = () => {
  const [selectedBank, setSelectedBank] = useState<string>('')
  const [step, setStep] = useState<number>(1)

  const onBankButtonClick = (value: string) => {
    if (selectedBank === value) {
      setSelectedBank('')
    } else {
      setSelectedBank(value)
    }
  }

  return (
    <div>
      <RegistButton
        onClickEvent={() => {
          ;(
            document.getElementById('modal') as HTMLDialogElement | null
          )?.showModal()
        }}
      />
      <dialog id="modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white ">
          <h3 className="font-bold text-lg mb-5">등록할 은행을 선택하세요.</h3>
          <div className="flex">
            <div className="flex flex-col w-full gap-2 items-center">
              {bankList.map((bank, index) => (
                <BankSelect
                  key={index}
                  bankName={bank.bankName}
                  bankImg={bank.bankImg}
                  selectedBank={selectedBank}
                  onBankButtonClick={onBankButtonClick}
                ></BankSelect>
              ))}
            </div>
            <div className="flex flex-col w-full gap-2 items-center">
              {bankList2.map((bank, index) => (
                <BankSelect
                  key={index}
                  bankName={bank.bankName}
                  bankImg={bank.bankImg}
                  selectedBank={selectedBank}
                  onBankButtonClick={onBankButtonClick}
                ></BankSelect>
              ))}
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog" className="modal-backdrop">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn bg-transparent border-none"
                onClick={() => setSelectedBank('')}
              >
                취소
              </button>
            </form>
            <div className="w-[70px] flex items-center">
              <Button
                color="primary"
                label="다음"
                onClick={() => setStep(step + 1)}
                size="lg"
                disabled={selectedBank === '' ? true : false}
              />
            </div>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default AccountRegistModal
