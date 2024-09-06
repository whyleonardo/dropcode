"use server"

import { redirect } from "next/navigation"

import { authProcedure } from "@/lib/procedures"

import { UnexpectedError } from "@/errors/unexpected-error"

import { db } from "@dropcode/db"

import { deleteFileByIdSchema } from "./schema"

export const deleteFileById = authProcedure
  .createServerAction()
  .input(deleteFileByIdSchema)
  .handler(async ({ input, ctx }) => {
    const { fileId, snippetSlug } = input
    const { user } = ctx

    try {
      await db.file.delete({
        where: {
          userId: user.id,
          snippet: { slug: snippetSlug },
          id: fileId,
        },
      })
    } catch {
      throw new UnexpectedError()
    }

    redirect(`/snippets/${snippetSlug}`)
  })
