import { LinesPerPeriodChart } from "@/components/analytics/lines-per-period-chart"
import { MostUsedLanguages } from "@/components/analytics/most-used-languages"

const WorkspacePage = async () => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      <LinesPerPeriodChart />
      <MostUsedLanguages />
    </div>
  )
}

export default WorkspacePage
