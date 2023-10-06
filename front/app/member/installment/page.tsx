'use client'
import Button from '@/app/components/Button'
import InstallmentInfo from './components/InstallmentInfo'
import TextButton from '@/app/components/TextButton'
import InstallmentDetail from './components/InstallmentDetail'
import { useState } from 'react'
import InstallmentOpeningTerm from './components/InstallmentOpeningTerm'
import InstallmentInfoStep from './components/InstallmentInfoStep'
import TermsAgreeStep from './components/TermsAgreeStep'
import InstallmentCreateStep from './components/InstallmentCreateStep'
import { memberEmailStore } from '@/stores/memberEmail'
import { accountListStore } from '@/stores/accountList'
import { useRouter } from 'next/navigation'

const InstallmentPage = () => {
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [accountName, setAccountName] = useState<string>('')
  const [termsAgreed, setTermsAgreed] = useState<boolean>(false)
  const [password, setPassword] = useState<string[]>(['', '', '', ''])
  const { memberEmail } = memberEmailStore()
  const { setInstallmentAccount } = accountListStore()
  const router = useRouter()

  const onAccountNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountName(e.target.value)
  }

  const onPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value

    if (/^\d*$/.test(value) && value.length <= 1) {
      const newPassword = [...password]
      newPassword[index] = value
      setPassword(newPassword)
    }
  }

  const createNewAccount = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SEESAW_API_URL}/member/create-account`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            accountName: accountName,
            memberEmail: memberEmail,
            accountPassword:
              password[0] + password[1] + password[2] + password[3],
          }),
        },
      )
      if (res.status == 200) {
        setInstallmentAccount(await res.json())
        router.replace('/member')
      } else {
        console.log(res)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const onNextButtonClick = () => {
    if (currentStep === 3) {
      createNewAccount()
    } else {
      setCurrentStep((prev) => prev + 1)
    }
  }

  return (
    <div className="flex flex-col h-screen justify-between">
      {currentStep === 1 ? (
        <InstallmentInfoStep />
      ) : currentStep === 2 ? (
        <TermsAgreeStep setTermsAgreed={() => setTermsAgreed(!termsAgreed)} />
      ) : (
        <InstallmentCreateStep
          accountName={accountName}
          password={password}
          onAccountNameChange={onAccountNameChange}
          onPasswordChange={onPasswordChange}
        />
      )}
      <div className="p-5">
        <Button
          color="primary"
          label={
            currentStep === 1
              ? '개설하기'
              : currentStep === 2
              ? '다음'
              : '개설하기'
          }
          onClick={() => onNextButtonClick()}
          size="xl"
          disabled={
            (currentStep === 2 && !termsAgreed) ||
            (currentStep === 3 && (accountName === '' || password.includes('')))
              ? true
              : false
          }
        />
      </div>
    </div>
  )
}

export default InstallmentPage
