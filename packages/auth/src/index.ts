import NextAuth, { type NextAuthResult } from "next-auth"

import { authConfig } from "./auth.config"

export const nextAuth = NextAuth(authConfig)

export const signIn: NextAuthResult["signIn"] = nextAuth.signIn
export const auth: NextAuthResult["auth"] = nextAuth.auth
export const signOut: NextAuthResult["signOut"] = nextAuth.signOut
export const update: NextAuthResult["unstable_update"] =
  nextAuth.unstable_update
export const handlers: NextAuthResult["handlers"] = nextAuth.handlers
