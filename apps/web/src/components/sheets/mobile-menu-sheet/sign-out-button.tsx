"use client"

import { Button } from "@/components/ui/button"

import { signOut } from "@/data/user-dto"

import { LogOut } from "lucide-react"

export const SignOutButton = () => {
  return (
    <Button
      onClick={async () => await signOut()}
      variant="ghost"
      className="mt-auto w-full border"
      type="submit"
    >
      <LogOut className="mr-2 size-4" />
      Sign Out
    </Button>
  )
}
