import { z } from "zod"

export const deleteCollectionByIdSchema = z.object({
  collectionId: z.string().uuid(),
})
