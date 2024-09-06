"use server"

import { langs } from "@/config/langs"

import { authProcedure } from "@/lib/procedures"

import { db } from "@dropcode/db"

import { fetchLinesCreatedInPeriodSchema } from "./schema"

type AccumulatorReduce = {
  lines: number
  language: string
}

export const fetchLinesCreatedInPeriod = authProcedure
  .createServerAction()
  .input(fetchLinesCreatedInPeriodSchema)
  .handler(async ({ ctx, input }) => {
    const {
      user: { id: userId },
    } = ctx

    const { period } = input

    const rangePerPeriod = {
      "all-time": new Date("2023-01-01").getTime(),
      "last-30-days": 30 * 24 * 60 * 60 * 1000,
      "last-7-days": 7 * 24 * 60 * 60 * 1000,
      "last-24-hours": 24 * 60 * 60 * 1000,
    }

    const range = rangePerPeriod[period]

    const files = await db.file.findMany({
      where: {
        userId,
        updatedAt: {
          gte: new Date(new Date().getTime() - range),
        },
      },
      select: {
        content: true,
        language: true,
      },
    })

    const linesInPeriodPerLanguage = files.reduce(
      (acc, file) => {
        const fileLines = file.content.split("\n").length

        if (!acc[file.language]) {
          const newObj = {
            language: file.language,
            lines: fileLines,
          }

          acc[file.language] = newObj

          return acc
        }

        acc[file.language].lines += fileLines

        return acc
      },
      {} as Record<string, AccumulatorReduce>
    )

    const chartData = Object.entries(linesInPeriodPerLanguage).map(
      ([_, { language, lines }]) => ({
        fill: langs[language].color,
        language: langs[language].name,
        lines,
      })
    )

    const totalLines = chartData.reduce((acc, { lines }) => acc + lines, 0)

    return {
      chartData,
      totalLines,
    }
  })
