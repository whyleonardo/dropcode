import { LinesPerPeriodChart } from "@/components/analytics/lines-per-period-chart"

const WorkspacePage = async () => {
  return (
    <div className="flex h-screen justify-center overflow-hidden">
      <LinesPerPeriodChart />
    </div>
  )
}

export default WorkspacePage
