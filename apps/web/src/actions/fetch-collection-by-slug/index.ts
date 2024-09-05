"use server"

import { authProcedure } from "@/actions/procedures"

import { db } from "@dropcode/db"

import { fetchCollectionBySlugSchema } from "./schema"

export const fetchCollectionBySlug = authProcedure
  .createServerAction()
  .input(fetchCollectionBySlugSchema)
  .handler(async ({ input, ctx }) => {
    const { collectionSlug } = input

    const {
      user: { id: userId },
    } = ctx

    const collection = await db.collection.findUnique({
      where: {
        userId,
        slug: collectionSlug,
      },
      include: {
        snippets: {
          include: {
            files: true,
            tags: true,
          },
          orderBy: {
            updatedAt: "desc",
          },
        },
      },
    })

    return collection
  })
