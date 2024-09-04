"use server"

import { authProcedure } from "@/actions/procedures"
import { ResourceNotFoundError } from "@/errors/resource-not-found-error"

import { db } from "@dropcode/db"

import { getFileBySlugSchema } from "./schema"

export const getFileBySlug = authProcedure
  .createServerAction()
  .input(getFileBySlugSchema)
  .handler(async ({ input, ctx }) => {
    const { snippetSlug, fileSlug } = input

    const {
      user: { id: userId },
    } = ctx

    const file = await db.file.findFirstOrThrow({
      where: {
        slug: fileSlug,
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
