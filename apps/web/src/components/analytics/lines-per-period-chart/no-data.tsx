"use client"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/analytics-card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const NoData = () => {
  return (
    <Card className="flex size-fit flex-col lg:min-w-[32rem]">
      <CardHeader className="items-center justify-center gap-2 pb-0">
        <div className="flex w-full items-center justify-between">
          <CardTitle>Lines by Language</CardTitle>

          <Select disabled>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Select a period" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all-time">All Time</SelectItem>
              <SelectItem value="last-24-hours">Last 24 Hours</SelectItem>
              <SelectItem value="last-7-days">Last 7 Days</SelectItem>
              <SelectItem value="last-30-days">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <div className="relative mx-auto flex size-72 max-h-[250px] min-h-44 items-center justify-center">
          <div className="bg-muted absolute size-48 rounded-full" />

          <div className="bg-background gap relative z-10 flex size-28 flex-col items-center justify-center rounded-full" />
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-center text-sm">
        <span className="text-muted-foreground flex items-center gap-2 leading-none">
          No data available
        </span>
      </CardFooter>
    </Card>
  )
}
