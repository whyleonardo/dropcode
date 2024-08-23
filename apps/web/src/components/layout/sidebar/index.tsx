import Link from "next/link"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { NavMenuLinks } from "./nav-menu-links"
import { UserInfo } from "./user-info"

export const Sidebar = () => {
  return (
    <aside className="bg-gray-2 flex h-full w-14 flex-col items-center border-r px-2 py-4">
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
    </aside>
  )
}
