import InstallmentOpeningTerm from './InstallmentOpeningTerm'

interface Props {
  setTermsAgreed: () => void
}

const TermsAgreeStep = (props: Props) => {
  return (
    <div className="flex flex-col p-5 pt-10 items-center gap-10 bg-background">
      <div className="text-2xl font-scDreamMedium">상품 이용약관</div>
      <InstallmentOpeningTerm />
      <div className="flex">
        <label className="label cursor-pointer">
          <span className="text-xl mr-2">위 약관에 동의합니다.</span>
          <input
            type="checkbox"
            className="checkbox checkbox-primary checkbox-lg"
            onClick={props.setTermsAgreed}
          />
        </label>
      </div>
    </div>
  )
}

export default TermsAgreeStep
