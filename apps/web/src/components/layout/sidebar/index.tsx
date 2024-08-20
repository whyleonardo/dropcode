import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { sidebarMenuLinks } from "@/config/sidebar-menu-links"

import { UserInfo } from "./user-info"

export const Sidebar = () => {
  return (
    <aside className="bg-gray-2 flex h-full w-14 flex-col items-center rounded-lg px-2 py-4">
      <TooltipProvider delayDuration={30}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              className="border-border rounded-full border"
              href="/workspace/me"
            >
              <UserInfo />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">User</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="mt-8 flex flex-col gap-2">
        {sidebarMenuLinks.map((link, index) => {
          const Icon = link.icon

          return (
            <TooltipProvider delayDuration={30} key={`${link.href}-${index}`}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={link.href}>
                      <Icon className="size-5" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">{link.label}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )
        })}
      </div>
    </aside>
  )
}
