import { LinesPerPeriodChart } from "@/components/analytics/lines-per-period-chart"
import { MostUsedLanguages } from "@/components/analytics/most-used-languages"

const WorkspacePage = async () => {
  return (
    <div className="mt-10 flex flex-wrap justify-center gap-4 md:mt-0">
      <LinesPerPeriodChart />
      <MostUsedLanguages />
    </div>
  )
}

export default WorkspacePage
