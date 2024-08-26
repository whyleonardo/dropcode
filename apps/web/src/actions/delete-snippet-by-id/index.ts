"use server"

import { revalidatePath } from "next/cache"

import { authProcedure } from "@/actions/procedures"
import { UnexpectedError } from "@/errors/unexpected-error"

import { db } from "@dropcode/db"

import { deleteSnippetByIdSchema } from "./schema"

export const deleteSnippetById = authProcedure
  .createServerAction()
  .input(deleteSnippetByIdSchema)
  .handler(async ({ input, ctx }) => {
    const { snippetId, collectionSlug } = input
    const { user } = ctx

    try {
      await db.snippet.delete({
        where: {
          userId: user.id,
          id: snippetId,
        },
      })
    } catch {
      throw new UnexpectedError()
    }

    revalidatePath(`/collection/${collectionSlug}`)
  })
