interface ReportTabProps {
  handleCalendarTabChange: (tab: string) => void
  activeCalendarTab: string
}

const ReportTab = ({
  activeCalendarTab,
  handleCalendarTabChange,
}: ReportTabProps) => {
  return (
    <div className="tabs grid grid-cols-3 h-10 font-scDreamMedium bg-white rounded-lg">
      <button
        className={`py-2 ${
          activeCalendarTab === 'tab1'
            ? 'tab-active border-b-2 border-primary text-primary'
            : 'text-surface'
        }`}
        onClick={() => handleCalendarTabChange('tab1')}
      >
        월별
      </button>
      <button
        className={`py-2 ${
          activeCalendarTab === 'tab2'
            ? 'tab-active border-b-2 border-primary text-primary'
            : 'text-surface'
        }`}
        onClick={() => handleCalendarTabChange('tab2')}
      >
        주별
      </button>
      <button
        className={`py-2 ${
          activeCalendarTab === 'tab3'
            ? 'tab-active border-b-2 border-primary text-primary'
            : 'text-surface'
        }`}
        onClick={() => handleCalendarTabChange('tab3')}
      >
        일별
      </button>
    </div>
  )
}
export default ReportTab
