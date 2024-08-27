import type { fetchLinesCreatedInPeriodSchema } from "@/actions/analytics/fetch-lines-created-in-period/schema"

import type { z } from "zod"

export type Period = z.infer<typeof fetchLinesCreatedInPeriodSchema>["period"]
