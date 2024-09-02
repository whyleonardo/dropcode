"use server"

import { signOut as authSignOut } from "@dropcode/auth"

export const signOut = async () => {
  await authSignOut()
}
