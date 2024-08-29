"use client"

import { useState } from "react"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/analytics-card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"

import type { Period } from "@/@types/analytics"
import { fetchLinesCreatedInPeriod } from "@/actions/analytics/fetch-lines-created-in-period"
import { useServerActionQuery } from "@/hooks/server-action-hooks"

import { Label, Pie, PieChart } from "recharts"

import { NoData } from "./no-data"

const cardInfos = {
  description: {
    "all-time": "All time",
    "last-24-hours": "Last 24 hours",
    "last-7-days": "Last week",
    "last-30-days": "Last month",
  },
  footer: {
    "all-time": "Showing total of code lines created for all time",
    "last-24-hours": "Showing total of code lines created for last 24 hours",
    "last-7-days": "Showing total of code lines created for last week",
    "last-30-days": "Showing total of code lines created for last month",
  },
}

export const LinesPerPeriodChart = () => {
  const [period, setPeriod] = useState<Period>("last-24-hours")

  const { data, isLoading } = useServerActionQuery(fetchLinesCreatedInPeriod, {
    queryKey: ["lines-created-in-period"],
    input: {
      period: period,
    },
  })

  if (data?.chartData.length === 0) {
    return <NoData />
  }

  return (
    <Card className="bg-gray-2 size-fit h-[28rem] w-full lg:w-fit lg:min-w-[32rem]">
      <CardHeader className="relative items-start justify-center gap-2 pb-0">
        <CardTitle>Lines per Language</CardTitle>

        <Select
          defaultValue={period ?? "last-24-hours"}
          onValueChange={(value) => setPeriod(value as Period)}
        >
          <SelectTrigger className="absolute right-4 top-2.5 w-44">
            <SelectValue placeholder="Select a period" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all-time">All Time</SelectItem>
            <SelectItem value="last-24-hours">Last 24 Hours</SelectItem>
            <SelectItem value="last-7-days">Last 7 Days</SelectItem>
            <SelectItem value="last-30-days">Last 30 Days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="relative mx-auto mt-12 flex size-72 min-h-44 items-center justify-center">
            <Skeleton className="dark:bg-gray-4 bg-gray-4 absolute size-52 rounded-full" />
            <div className="bg-gray-2 relative z-10 flex size-28 rounded-full" />
          </div>
        ) : (
          <ChartContainer config={{}} className="mx-auto mt-12 size-72">
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={data?.chartData}
                dataKey="lines"
                nameKey="language"
                innerRadius={55}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {data?.totalLines.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Lines
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-center text-sm">
        <span className="text-muted-foreground flex items-center gap-2 leading-none">
          {cardInfos.footer[period as Period]}
        </span>
      </CardFooter>
    </Card>
  )
}
