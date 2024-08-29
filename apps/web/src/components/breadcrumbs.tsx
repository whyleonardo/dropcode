"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Fragment } from "react"

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { cn } from "@dropcode/tailwind/utils"

import { Home } from "lucide-react"

export const Breadcrumbs = () => {
  const pathname = usePathname()

  const segments = pathname.split("/").filter((path) => path)
  const isHome = pathname === "/"

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbPage>
          <BreadcrumbLink asChild>
            <Link
              className="text-2xl font-medium tracking-tighter transition-opacity hover:opacity-85"
              href="/"
            >
              {isHome ? "Dashboard" : <Home className="size-4" />}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbPage>

        <BreadcrumbSeparator className="last-of-type:hidden" />

        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`
          const isActive = segment === pathname.split("/").at(-1)

          if (segment === "snippet" && index === 0) {
            return (
              <Fragment
                // biome-ignore lint/suspicious/noArrayIndexKey: Using index here with another information
                key={`${segment}-${index}`}
              >
                <BreadcrumbItem>
                  <BreadcrumbEllipsis />
                </BreadcrumbItem>

                <BreadcrumbSeparator className="last-of-type:hidden" />
              </Fragment>
            )
          }

          return (
            <Fragment key={segment}>
              <BreadcrumbItem>
                <BreadcrumbLink
                  asChild
                  className={cn(isActive && "underline underline-offset-4")}
                >
                  <Link href={href}>{segment}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator className="last-of-type:hidden" />
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
