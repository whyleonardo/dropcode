import { z } from "zod"

export const deleteFileByIdSchema = z.object({
  fileId: z.string(),
  snippetId: z.string().uuid(),
})
