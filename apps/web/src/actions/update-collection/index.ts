"use server"

import { revalidatePath } from "next/cache"

import { authProcedure } from "@/actions/procedures"
import { SameSlugError } from "@/errors/same-slug-error"
import { UnexpectedError } from "@/errors/unexpected-error"
import { createSlug } from "@/utils/create-slug"

import { db } from "@dropcode/db"
import type { Collection } from "@dropcode/db/types"

import { updateCollectionSchema } from "./schema"

export const updateCollection = authProcedure
  .createServerAction()
  .input(updateCollectionSchema)
  .handler(async ({ input, ctx }) => {
    const { title, id: collectionId } = input

    const { user } = ctx

    const slug = createSlug(title)

    const findForRepeatedCollectionSlug = await db.collection.findUnique({
      where: {
        slug,
        userId: user.id,
      },
    })

    if (findForRepeatedCollectionSlug) {
      throw new SameSlugError("collection")
    }

    let collection: Collection

    try {
      collection = await db.collection.update({
        where: {
          id: collectionId,
          userId: user.id,
        },
        data: {
          title,
        },
      })
    } catch {
      throw new UnexpectedError()
    }

    revalidatePath(`/collections/${collection.slug}`)
  })
