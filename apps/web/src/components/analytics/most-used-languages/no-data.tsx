"use client"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/analytics-card"

export const NoData = () => {
  return (
    <Card className="bg-gray-2 size-fit h-[28rem] w-full lg:w-fit lg:min-w-[32rem]">
      <CardHeader className="items-center justify-center gap-2 pb-0">
        <div className="flex w-full items-center justify-between">
          <CardTitle>Most Files per Language</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <div className="relative mx-auto mt-12 flex size-72 min-h-44 items-center justify-center">
          <div className="bg-muted absolute size-52 rounded-full" />

          <div className="bg-gray-2 relative z-10 flex size-28 rounded-full" />
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
