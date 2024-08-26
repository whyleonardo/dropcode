import { z } from "zod"

export const fetchCollectionBySlugSchema = z.object({
  collectionSlug: z.string(),
})
