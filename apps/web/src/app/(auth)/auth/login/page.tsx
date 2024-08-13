import { Suspense } from "react"

import { auth, signIn } from "@soli/auth"

const LoginPage = async () => {
  const session = await auth()

  return (
    <div className="container flex h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold tracking-tight">Login Page</h1>

      <form
        action={async () => {
          "use server"
          await signIn("github")
        }}
      >
        <button type="submit">Sign in with GitHub</button>
      </form>

      <Suspense fallback={<div>Loading User...</div>}>
        {session?.user?.name}
      </Suspense>
    </div>
  )
}

export default LoginPage
