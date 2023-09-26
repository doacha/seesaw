import { useState } from 'react'
import OpenModalButton from './OpenModalButton'
import Button from '@/app/components/Button'
import BankSelectStep from './BankSelectStep'
import AccountInputStep from './AccountInputStep'
import OneCoinInputStep from './OneCoinInputStep'

const AccountRegistModal = () => {
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [selectedBank, setSelectedBank] = useState<string>('')
  const [accountNumber, setAccountNumber] = useState<string>('')
  const [authenticationCode, setAuthenticationCode] = useState<string>('')

  const onAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('실행')
    setAccountNumber(e.target.value)
  }

  const onAuthenticationNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    return setAuthenticationCode(e.target.value)
  }

  const onBankButtonClick = (value: string) => {
    if (selectedBank === value) {
      setSelectedBank('')
    } else {
      setSelectedBank(value)
    }
  }

  const onNextButtonClick = () => {
    if (currentStep === 1) {
      setCurrentStep(2)
    } else if (currentStep === 2) {
      console.log(accountNumber)
      //axios 1원인증 코드 작성 위치
      setCurrentStep(3)
    } else if (currentStep === 3) {
    }
  }

  return (
    <div>
      <OpenModalButton
        onClickEvent={() => {
          ;(
            document.getElementById('modal') as HTMLDialogElement | null
          )?.showModal()
        }}
      />
      <dialog id="modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-background">
          {currentStep === 1 ? (
            <BankSelectStep
              selectedBank={selectedBank}
              onBankButtonClick={onBankButtonClick}
            />
          ) : currentStep === 2 ? (
            <AccountInputStep
              selectedBank={selectedBank}
              accountNumber={accountNumber}
              onAccountNumberChange={onAccountNumberChange}
            />
          ) : (
            <OneCoinInputStep
              authenticationCode={authenticationCode}
              onAuthenticationCodeChange={onAuthenticationNumberChange}
            />
          )}

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn bg-transparent border-none text-base"
                onClick={() => {
                  setSelectedBank('')
                  setCurrentStep(1)
                }}
              >
                취소
              </button>
            </form>
            <div className="flex items-center">
              <Button
                color="primary"
                label={
                  currentStep === 1
                    ? '다음'
                    : currentStep === 2
                    ? '인증하기'
                    : '등록하기'
                }
                onClick={onNextButtonClick}
                size="lg"
                disabled={
                  currentStep === 1 && selectedBank === '' ? true : false
                }
              />
            </div>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default AccountRegistModal
