"use server"

import { revalidatePath } from "next/cache"

import { authProcedure } from "@/actions/procedures"
import { UnexpectedError } from "@/errors/unexpected-error"

import { db } from "@dropcode/db"

import { deleteCollectionByIdSchema } from "./schema"

export const deleteCollectionById = authProcedure
  .createServerAction()
  .input(deleteCollectionByIdSchema)
  .handler(async ({ input, ctx }) => {
    const { collectionId } = input

    const { user } = ctx

    try {
      await db.collection.delete({
        where: {
          userId: user.id,
          id: collectionId,
        },
      })
    } catch {
      throw new UnexpectedError()
    }

    revalidatePath("/collections")
  })
