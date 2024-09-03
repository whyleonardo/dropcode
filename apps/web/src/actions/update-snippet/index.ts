"use server"

import { revalidatePath } from "next/cache"

import { authProcedure } from "@/actions/procedures"
import { SameSlugError } from "@/errors/same-slug-error"
import { UnauthorizedError } from "@/errors/unauthorized-error"
import { UnexpectedError } from "@/errors/unexpected-error"
import { createSlug } from "@/utils/create-slug"

import { db } from "@dropcode/db"
import type { Snippet } from "@dropcode/db/types"

import { updateSnippetSchema } from "./schema"

export const updateSnippet = authProcedure
  .createServerAction()
  .input(updateSnippetSchema)
  .handler(async ({ input, ctx }) => {
    const {
      title,
      description,
      isPublic,
      collectionSlug,
      id: snippetId,
    } = input

    const { user } = ctx

    const slug = createSlug(title)

    const collection = await db.collection.findUnique({
      where: {
        slug: collectionSlug,
        userId: user.id,
      },
    })

    if (!collection) {
      throw new UnauthorizedError()
    }

    const findForRepeatedSnippetSlug = await db.snippet.findUnique({
      where: {
        slug,
        userId: user.id,
      },
    })

    if (findForRepeatedSnippetSlug) {
      throw new SameSlugError("snippet")
    }

    let snippet: Snippet

    try {
      snippet = await db.snippet.update({
        where: {
          id: snippetId,
          userId: user.id,
          collection: { id: collection.id },
        },
        data: {
          title,
          slug,
          description,
          collectionId: collection.id,
          isFavorite: false,
          isPublic,
          userId: user.id,
        },
      })
    } catch {
      throw new UnexpectedError(
        "An unexpected error occurred while updating your snippet"
      )
    }

    revalidatePath(`/collections/${collectionSlug}/${snippet.slug}`)
  })
