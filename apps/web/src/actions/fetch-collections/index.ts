"use server"

import { authProcedure } from "@/actions/procedures"

import { db } from "@dropcode/db"

import { fetchCollectionsSchema } from "./schema"

export const fetchCollections = authProcedure
  .createServerAction()
  .input(fetchCollectionsSchema)
  .handler(async ({ ctx }) => {
    const {
      user: { id: userId },
    } = ctx

    const collections = await db.collection.findMany({
      where: {
        userId,
      },
      include: {
        _count: true,
        snippets: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    })

    return collections
  })
