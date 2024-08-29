"use server"

import { redirect } from "next/navigation"

import { authProcedure } from "@/actions/procedures"
import { SameSlugError } from "@/errors/same-slug-error"
import { UnauthorizedError } from "@/errors/unauthorized-error"
import { UnexpectedError } from "@/errors/unexpected-error"
import { createSlug } from "@/utils/create-slug"

import { db } from "@dropcode/db"
import type { Snippet } from "@dropcode/db/types"

import { createSnippetSchema } from "./schema"

export const createSnippet = authProcedure
  .createServerAction()
  .input(createSnippetSchema)
  .handler(async ({ input, ctx }) => {
    const { title, description, isPublic, collectionSlug, tags } = input

    const { user } = ctx

    const slug = createSlug(title)

    const tagsWithFormattedSlug = tags.map((tag) => createSlug(tag))

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
      await db.tag.createMany({
        data: tagsWithFormattedSlug.map((tag) => ({
          userId: user.id,
          slug: tag,
        })),
        skipDuplicates: true,
      })

      snippet = await db.snippet.create({
        data: {
          title,
          slug,
          description,
          collectionId: collection.id,
          isFavorite: false,
          isPublic,
          userId: user.id,
          tags: {
            connect: tagsWithFormattedSlug.map((tag) => ({
              slug: tag,
            })),
          },
        },
      })
    } catch {
      throw new UnexpectedError(
        "An unexpected error occurred while creating your snippet"
      )
    }

    redirect(`/collections/${collectionSlug}/${snippet.slug}`)
  })
