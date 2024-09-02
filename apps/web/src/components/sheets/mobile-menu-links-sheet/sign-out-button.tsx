import { Button } from "@/components/ui/button"

import { signOut } from "@/actions/auth/sign-out"

export const SignOutButton = () => {
  return (
    <form action={() => signOut()}>
      <Button variant="ghost" className="mt-auto w-full border">
        Sign Out
      </Button>
    </form>
  )
}
