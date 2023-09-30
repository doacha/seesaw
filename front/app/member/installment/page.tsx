'use client'
import Button from '@/app/components/Button'
import InstallmentInfo from './components/InstallmentInfo'
import { useRouter } from 'next/router'
import TextButton from '@/app/components/TextButton'
import InstallmentDetail from './components/InstallmentDetail'

const InstallmentPage = () => {
  let currentStep = 1

  return (
    <div className="flex flex-col h-screen justify-between">
      <div className="flex flex-col">
        <InstallmentInfo />
        <InstallmentDetail />
      </div>
      <div className="p-5">
        <Button
          color="primary"
          label="개설하기"
          onClick={() => (currentStep += 1)}
          size="xl"
        />
      </div>
    </div>
  )
}

export default InstallmentPage
