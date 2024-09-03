import { UserInfo } from "@/components/layout/sidebar/user-info"
import { ThemeToggle } from "@/components/theme-toggle"

import { getUserAccountProvider } from "@/actions/get-user-account-provider"

import { auth } from "@dropcode/auth"

import { NavMenuLinks } from "./nav-menu-links"
import { SignOutButton } from "./sign-out-button"

export const Sidebar = async () => {
  const session = await auth()

  if (!session?.user?.id) return null

  const [provider] = await getUserAccountProvider({ userId: session.user.id })

  const user = {
    ...session.user,
    ...provider,
  }

  return (
    <aside className="bg-gray-2 flex hidden h-full w-14 flex-col items-center border-r px-2 py-4 md:flex">
      <UserInfo user={user} />

      <div className="mt-8 flex flex-col gap-2">
        <NavMenuLinks />
      </div>
      <div className="mt-auto flex flex-col items-center justify-center gap-2">
        <ThemeToggle />

        <SignOutButton />
      </div>
    </aside>
  )
}
