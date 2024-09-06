import { z } from "zod"

export const getFileByPublicIdSchema = z.object({
  filePublicId: z.string(),
  snippetSlug: z.string(),
})
