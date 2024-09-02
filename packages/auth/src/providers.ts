import GitHub from "next-auth/providers/github"
import GitLab from "next-auth/providers/gitlab"

import { env } from "@dropcode/env/web"

export const providers = [
  GitHub({
    clientId: env.AUTH_GITHUB_ID,
    clientSecret: env.AUTH_GITHUB_SECRET,
  }),
  GitLab({
    clientId: env.AUTH_GITLAB_ID,
    clientSecret: env.AUTH_GITLAB_SECRET,
  }),
]
