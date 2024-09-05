"use server"

import { authProcedure } from "@/actions/procedures"
import { SameSlugError } from "@/errors/same-slug-error"
import { UnexpectedError } from "@/errors/unexpected-error"
import { createSlug } from "@/utils/create-slug"

import { db } from "@dropcode/db"

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

    try {
      await db.collection.update({
        where: {
          id: collectionId,
          userId: user.id,
        },
        data: {
          title,
          slug,
        },
      })
    } catch {
      throw new UnexpectedError()
    }
  })
