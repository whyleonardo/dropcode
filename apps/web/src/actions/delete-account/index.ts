"use server"

import { authProcedure } from "@/actions/procedures"
import { UnauthorizedError } from "@/errors/unauthorized-error"
import { UnexpectedError } from "@/errors/unexpected-error"

import { signOut } from "@dropcode/auth"
import { db } from "@dropcode/db"

import { deleteAccountSchema } from "./schema"

export const deleteAccount = authProcedure
  .createServerAction()
  .input(deleteAccountSchema)
  .onError((err) => {
    console.log(err)
  })
  .handler(async ({ input, ctx }) => {
    const { userId } = input

    const { user: contextUser } = ctx

    if (contextUser.id !== userId) {
      throw new UnauthorizedError()
    }

    try {
      await db.user.delete({
        where: {
          id: userId,
        },
      })
    } catch {
      throw new UnexpectedError()
    } finally {
      await signOut()
    }
  })
