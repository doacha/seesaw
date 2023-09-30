import InstallmentDetail from './InstallmentDetail'
import InstallmentInfo from './InstallmentInfo'

const InstallmentInfoStep = () => {
  return (
    <div className="flex flex-col ">
      <div className="flex flex-col">
        <InstallmentInfo />
        <InstallmentDetail />
      </div>
    </div>
  )
}

export default InstallmentInfoStep
