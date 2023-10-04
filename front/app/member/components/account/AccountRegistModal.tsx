import { useState } from 'react'
import OpenModalButton from './OpenModalButton'
import Button from '@/app/components/Button'
import BankSelectStep from './BankSelectStep'
import AccountInputStep from './AccountInputStep'
import OneCoinInputStep from './OneCoinInputStep'
import { account } from '@/app/dummies'
import { accountListStore } from '@/stores/accountList'
import { redirect, useRouter } from 'next/navigation'
import { memberEmailStore } from '@/stores/memberEmail'

interface Props {
  getAccountListInfo: () => Promise<any>
}

const AccountRegistModal = (props: Props) => {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [selectedBank, setSelectedBank] = useState<string>('')
  const [accountNumber, setAccountNumber] = useState<string>('')
  const [accountChecked, setAccountChecked] = useState<number>(0)
  const [accountHolder, setAccountHolder] = useState<string>('')
  const [accountDealNum, setAccountDealNum] = useState<string>('')
  const [authenticationCode, setAuthenticationCode] = useState<string[]>([
    '',
    '',
    '',
    '',
  ])
  const [wrongCode, setWrongCode] = useState<boolean>(false)
  const { setAccountList } = accountListStore()
  const { memberEmail } = memberEmailStore()

  const onAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountNumber(e.target.value)
  }

  const onAuthenticationCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value

    if (/^\d*$/.test(value) && value.length <= 1) {
      const newCode = [...authenticationCode]
      newCode[index] = value
      setAuthenticationCode(newCode)
    }
  }

  const onBankButtonClick = (value: string) => {
    if (selectedBank === value) {
      setSelectedBank('')
    } else {
      setSelectedBank(value)
    }
  }

  const onNextButtonClick = async () => {
    if (currentStep === 1) {
      setCurrentStep(2)
    } else if (currentStep === 2) {
      if (accountChecked !== 1) {
        //계좌확인

        console.log('계좌번호', accountNumber)
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_SEESAW_BANK_API_URL}/account-transactional/check-transfer`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                accountTransactionNum: accountNumber,
                accoutApprovalAmount: 0,
              }),
            },
          )
          const data = await res.json()
          if (data.status !== 500) {
            setAccountChecked(1)
            setAccountHolder(data.accountTransactionName)
          } else {
            setAccountChecked(2)
          }
        } catch (err) {
          setAccountChecked(2)
          console.log(err)
        }
      } else {
        //1원인증 보내기
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_SEESAW_BANK_API_URL}/account-transactional/send`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
              body: accountNumber,
            },
          )

          const data = await res.text()
          setAccountDealNum(data)
          setCurrentStep(3)
        } catch (err) {
          console.log(err)
        }
      }
    } else if (currentStep === 3) {
      //1원인증번호 확인
      const authNum =
        authenticationCode[0] +
        authenticationCode[1] +
        authenticationCode[2] +
        authenticationCode[3]
      // console.log(authNum, accountDealNum)
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SEESAW_BANK_API_URL}/account-transactional/check`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              accountDealNum: accountDealNum,
              authenticationNum: authNum,
            }),
          },
        )
        const data = await res.text()
        console.log(data)
        if (data !== 'fail') {
          try {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/member/link-seesawbank`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  memberEmail: memberEmail,
                  memberBankId: data,
                  memberMainAccount: accountNumber,
                }),
              },
            )
            const secondData = await res.text()
            // console.log('second', secondData)
            if (secondData === 'success') {
              ;(
                document.getElementById('modal') as HTMLDialogElement | null
              )?.close()
              setSelectedBank('')
              setAccountChecked(0)
              setAccountNumber('')
              setCurrentStep(1)
              props.getAccountListInfo()
            } else {
              console.log('계좌 등록에 오류가 있습니다.')
            }
          } catch (error) {}
        } else {
          setWrongCode(true)
        }
      } catch (err) {
        setAccountChecked(2)
        console.log(err)
      }
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
              accountHolder={accountHolder}
              accountChecked={accountChecked}
              onAccountNumberChange={onAccountNumberChange}
            />
          ) : (
            <OneCoinInputStep
              authenticationCode={authenticationCode}
              onAuthenticationCodeChange={onAuthenticationCodeChange}
              wrongCode={wrongCode}
            />
          )}

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn bg-transparent border-none text-base"
                onClick={() => {
                  setSelectedBank('')
                  setAccountChecked(0)
                  setAccountNumber('')
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
                    ? accountChecked !== 1
                      ? '계좌 확인'
                      : '인증하기'
                    : '등록하기'
                }
                onClick={onNextButtonClick}
                size="lg"
                disabled={
                  (currentStep === 1 && selectedBank === '') ||
                  (currentStep === 2 && accountNumber === '') ||
                  (currentStep === 3 && authenticationCode.includes(''))
                    ? true
                    : false
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
