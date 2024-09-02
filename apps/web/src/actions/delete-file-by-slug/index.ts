"use server"

import { redirect } from "next/navigation"

import { authProcedure } from "@/actions/procedures"
import { ResourceNotFoundError } from "@/errors/resource-not-found-error"
import { UnexpectedError } from "@/errors/unexpected-error"

import { db } from "@dropcode/db"

import { deleteFileBySlugSchema } from "./schema"

export const deleteFileBySlug = authProcedure
  .createServerAction()
  .input(deleteFileBySlugSchema)
  .handler(async ({ input, ctx }) => {
    const { fileSlug, snippetSlug } = input

    const { user } = ctx

    try {
      await db.file.delete({
        where: {
          userId: user.id,
          slug: fileSlug,
          snippet: {
            slug: snippetSlug,
          },
        },
      })
    } catch {
      throw new UnexpectedError()
    }

    const snippet = await db.snippet.findUnique({
      where: { slug: snippetSlug, userId: user.id },
      select: {
        slug: true,
        collection: {
          select: {
            slug: true,
          },
        },
        files: {
          take: 1,
          orderBy: {
            updatedAt: "asc",
          },
        },
      },
    })

    if (!snippet) {
      throw new ResourceNotFoundError()
    }
    redirect(`/collections/${snippet.collection?.slug}/${snippet.slug}/`)
  })
