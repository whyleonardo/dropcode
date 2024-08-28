"use server"

import { langs } from "@/config/langs"

import { authProcedure } from "@/actions/procedures"

import { db } from "@dropcode/db"

import { fetchMostUsedLanguagesSchema } from "./schema"

type AccumulatorReduce = {
  language: string
  count: number
}

const MAX_LANGUAGES_TO_RETURN = 4

export const fetchMostUsedLanguages = authProcedure
  .createServerAction()
  .input(fetchMostUsedLanguagesSchema)
  .handler(async ({ ctx }) => {
    const {
      user: { id: userId },
    } = ctx

    const files = await db.file.findMany({
      where: {
        userId,
      },
      select: {
        language: true,
      },
    })

    const fiveMostUsedLanguages = files.reduce(
      (acc, current) => {
        if (!acc[current.language]) {
          const newObj = {
            language: current.language,
            count: 1,
          }

          acc[current.language] = newObj

          return acc
        }

        acc[current.language].count += 1

        return acc
      },
      {} as Record<string, AccumulatorReduce>
    )

    const chartData = Object.entries(fiveMostUsedLanguages)
      .map(([_, { language, count }], index) => {
        if (index > MAX_LANGUAGES_TO_RETURN) return

        return {
          fill: langs[language].color,
          language: langs[language].name,
          count,
        }
      })
      .sort((a, b) => (a && b ? b.count - a.count : 0))

    return chartData
  })
