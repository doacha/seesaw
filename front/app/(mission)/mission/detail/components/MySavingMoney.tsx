import VerticalGraphBar from '@/app/components/VerticalGraphBar'

const dummy = [
  {
    savingMoney: 3000,
    missionNumber: 1,
  },
  {
    savingMoney: 4000,
    missionNumber: 2,
  },
  {
    savingMoney: 3500,
    missionNumber: 3,
  },
  {
    savingMoney: 3800,
    missionNumber: 4,
  },
  {
    savingMoney: 2800,
    missionNumber: 5,
  },
  {
    savingMoney: 2900,
    missionNumber: 6,
  },
  {
    savingMoney: 4200,
    missionNumber: 7,
  },
  {
    savingMoney: 3000,
    missionNumber: 1,
  },
  {
    savingMoney: 4000,
    missionNumber: 2,
  },
  {
    savingMoney: 3500,
    missionNumber: 3,
  },
  {
    savingMoney: 113800,
    missionNumber: 4,
  },
  {
    savingMoney: 2800,
    missionNumber: 15,
  },
  {
    savingMoney: 2900,
    missionNumber: 6,
  },
  {
    savingMoney: 4200,
    missionNumber: 15,
  },
]
const MySavingMoney = () => {
  return (
    <div className="bg-background rounded-lg p-5">
      <div>절약 금액</div>
      <hr className="my-[15px] text-outline" />
      <div className="bg-background-fill rounded-lg p-5">
        <div>누적 금액 </div>
        <div dir="rtl">
          <div className=" overflow-auto h-[350px]">
            <div className="flex flex-row gap-5">
              {dummy.reverse().map((element, idx) => (
                <VerticalGraphBar
                  round={element.missionNumber}
                  amount={element.savingMoney}
                  txtColor="text-black"
                  bgColor={idx === 0 ? 'bg-primary' : 'bg-background'}
                  length="30px"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MySavingMoney
