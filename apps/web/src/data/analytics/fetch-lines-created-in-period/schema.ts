import { z } from "zod"

export const fetchLinesCreatedInPeriodSchema = z.object({
  period: z.enum(["all-time", "last-30-days", "last-7-days", "last-24-hours"]),
})
