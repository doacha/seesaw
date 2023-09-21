import CategoryList from '@/app/home/components/CategoryList'

const CategoryInput = ({
  name,
  value,
  onChange,
}: {
  name: string
  value?: string
  onChange: any
}) => {
  return (
    <div>
      <div className="font-scDreamExBold">미션 카테고리를 선택해주세요.</div>
      <CategoryList onClick={() => {}} />
    </div>
  )
}

export default CategoryInput
