"use server"

import { authProcedure } from "@/lib/procedures"

import { UnexpectedError } from "@/errors/unexpected-error"

import { db } from "@dropcode/db"
import type { File } from "@dropcode/db/types"

import { getFileByPublicIdSchema } from "./schema"

export const getFileByPublicId = authProcedure
  .createServerAction()
  .input(getFileByPublicIdSchema)
  .handler(async ({ input, ctx }) => {
    const { snippetSlug, filePublicId } = input

    const { user } = ctx

    let file: File | null

    try {
      file = await db.file.findUnique({
        where: {
          publicId: filePublicId,
          userId: user.id,
          snippet: {
            slug: snippetSlug,
          },
        },
      })
    } catch {
      throw new UnexpectedError()
    }

    return file
  })
