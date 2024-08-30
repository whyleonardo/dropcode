import Link from "next/link"

import { ThemeToggle } from "@/components/theme-toggle"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { NavMenuLinks } from "./nav-menu-links"
import { SignOutButton } from "./sign-out-button"
import { UserInfo } from "./user-info"

export const Sidebar = () => {
  return (
    <aside className="bg-gray-2 flex hidden h-full w-14 flex-col items-center border-r px-2 py-4 lg:flex">
      <TooltipProvider delayDuration={30}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              className="border-border pointer-events-none rounded-full border"
              href="/me"
            >
              <UserInfo />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">User</TooltipContent>
        </Tooltip>
      </TooltipProvider>
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
