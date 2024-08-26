import GitHub from "next-auth/providers/github"

import { env } from "@dropcode/env/web"

export const providers = [
  GitHub({
    clientId: env.AUTH_GITHUB_ID,
    clientSecret: env.AUTH_GITHUB_SECRET,
  }),
]
