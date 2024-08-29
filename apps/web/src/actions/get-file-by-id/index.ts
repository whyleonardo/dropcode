"use server"

import { authProcedure } from "@/actions/procedures"
import { ResourceNotFoundError } from "@/errors/resource-not-found-error"

import { db } from "@dropcode/db"

import { getFileByIdSchema } from "./schema"

export const getFileById = authProcedure
  .createServerAction()
  .input(getFileByIdSchema)
  .handler(async ({ input, ctx }) => {
    const { snippetSlug, fileId } = input

    const {
      user: { id: userId },
    } = ctx

    const file = await db.file.findFirstOrThrow({
      where: {
        id: fileId,
        userId,
        snippet: {
          slug: snippetSlug,
        },
      },
    })

    if (!file) {
      new ResourceNotFoundError()
    }

    return file
  })
