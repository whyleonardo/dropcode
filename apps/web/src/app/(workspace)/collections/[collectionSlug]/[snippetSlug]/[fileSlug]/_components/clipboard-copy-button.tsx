"use client"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { CoolMode } from "@/components/ui/motion/cool-mode"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { cn } from "@dropcode/tailwind/utils"

import { Check, Clipboard } from "lucide-react"
import { toast } from "sonner"

interface ClipboardCopyButtonProps {
  code: string
}

export const ClipboardCopyButton = ({ code }: ClipboardCopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false)

  const onClick = async () => {
    setIsCopied(true)
    await navigator.clipboard.writeText(code)
    toast.info("Copied to clipboard!")
  }

  useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => {
        setIsCopied(false)
      }, 2000)

      return () => clearTimeout(timeout)
    }
  }, [isCopied])
  return (
    <TooltipProvider delayDuration={30}>
      <Tooltip>
        <TooltipTrigger asChild>
          <CoolMode
            options={{
              size: 10,
            }}
          >
            <Button
              type="button"
              size="icon"
              variant="outline"
              disabled={isCopied}
              className="overflow- fixed right-8 top-20 z-[9999] size-8 overflow-hidden disabled:opacity-100"
              onClick={onClick}
            >
              <Check
                className={cn(
                  "absolute size-4 -translate-y-12 transition-transform",
                  isCopied && "translate-y-0"
                )}
              />

              <Clipboard
                className={cn(
                  "absolute size-4 transition-transform",
                  isCopied && "translate-y-10"
                )}
              />
            </Button>
          </CoolMode>
        </TooltipTrigger>

        <TooltipContent side="left">Copy content to clipboard</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
