"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { buttonVariants } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { sidebarMenuLinks } from "@/config/sidebar-menu-links"

import { cn } from "@dropcode/tailwind/utils"

export const NavMenuLinks = () => {
  const pathname = usePathname()

  return (
    <>
      {sidebarMenuLinks.map((link, index) => {
        const Icon = link.icon

        const activeLink =
          (pathname.includes(link.href) && link.href !== "/") ||
          link.href === pathname

        return (
          <TooltipProvider delayDuration={30} key={`${link.href}-${index}`}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={link.href}
                  aria-disabled={link.isDisabled}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "relative",
                    link.isDisabled &&
                      "pointer-events-none cursor-not-allowed opacity-50"
                  )}
                >
                  <div
                    className={cn(
                      activeLink &&
                        "bg-primary absolute right-0 top-0 z-10 size-1.5 animate-pulse rounded-full"
                    )}
                  />
                  <Icon className="size-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{link.label}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      })}
    </>
  )
}
