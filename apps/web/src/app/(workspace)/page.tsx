import { LinesPerPeriodChart } from "@/components/analytics/lines-per-period-chart"
import { MostUsedLanguages } from "@/components/analytics/most-used-languages"
import { ScrollArea } from "@/components/ui/scroll-area"

const WorkspacePage = async () => {
  return (
    <ScrollArea className="mt-12 h-[calc(100%-3.5rem)]">
      <div className="flex flex-wrap justify-center gap-4">
        <MostUsedLanguages />
        <LinesPerPeriodChart />
      </div>
    </ScrollArea>
  )
}

export default WorkspacePage
