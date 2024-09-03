"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { SheetClose } from "@/components/ui/sheet"

import { sidebarMenuLinks } from "@/config/sidebar-menu-links"

import { cn } from "@dropcode/tailwind/utils"

export const MobileNavMenuLinks = () => {
  const pathname = usePathname()

  return (
    <div className="flex h-[calc(100dvh-21.5rem)] w-full flex-col gap-4">
      {sidebarMenuLinks.map((link) => {
        const Icon = link.icon

        const activeLink =
          (pathname.includes(link.href) && link.href !== "/") ||
          link.href === pathname

        return (
          <SheetClose key={`${link.label}-${link.href}`} asChild>
            <Link
              href={link.href}
              aria-disabled={link.isDisabled}
              className="flex w-full items-center justify-start gap-2 p-2 text-lg font-medium"
            >
              <Icon className="size-5" />

              {link.label}

              <div
                className={cn(
                  activeLink &&
                    "bg-primary ml-2 size-1.5 animate-pulse rounded-full"
                )}
              />
            </Link>
          </SheetClose>
        )
      })}
    </div>
  )
}
