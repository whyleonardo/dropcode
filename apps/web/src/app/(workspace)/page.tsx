import { LinesPerPeriodChart } from "@/components/analytics/lines-per-period-chart"
import { MostUsedLanguages } from "@/components/analytics/most-used-languages"

const WorkspacePage = async () => {
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-4">
      <MostUsedLanguages />
      <LinesPerPeriodChart />
    </div>
  )
}

export default WorkspacePage
