const StatusBar = ({ success, fail }: { success: number; fail: number }) => {
  return (
    <div className="flex w-full gap-2.5 mb-5 my-5">
      <div className="flex w-full flex-[4_1_0%] rounded-full overflow-hidden">
        {success > 0 && (
          <div
            style={{ flex: success }}
            className="bg-seesaw-blue-100 w-full rounded-l-full text-center text-seesaw-purple-600 font-scDreamExBold"
          >
            {success}
          </div>
        )}
        {fail > 0 && (
          <div
            style={{ flex: fail }}
            className="bg-seesaw-red-100 w-full rounded-r-full text-center text-seesaw-red-700 font-scDreamExBold"
          >
            {fail}
          </div>
        )}
      </div>
      <div className="w-full flex-[1_1_0%] text-outline text-sm m-auto text-center">
        {Math.round((success / (success + fail)) * 1000) / 10} %
      </div>
    </div>
  )
}

export default StatusBar
